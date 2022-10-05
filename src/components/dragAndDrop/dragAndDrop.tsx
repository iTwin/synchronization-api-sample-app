/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { useEffect, useRef, useState } from 'react';
import { useFileDropHandle } from '../../hooks/useFileDropHandle';
import { ModelFileExtension, Status } from '../../typedef/types';
import './dragAndDrop.scss';

interface FilesDragAndDropProps {
  children: React.ReactElement | React.ReactElement[];
  handleWorkflowStatus: (state: Status | null) => void;
  disableDropping: boolean;
  showDefaultOverlay: boolean;
  areRunsLoading: boolean;
}

/*
 * DragAndDrop is used to for files drag and drop functionality
 */
export const DragAndDrop = ({
  children,
  handleWorkflowStatus,
  disableDropping,
  showDefaultOverlay,
  areRunsLoading,
}: FilesDragAndDropProps) => {
  const [uploadAndSynchronize, workflowStatus] = useFileDropHandle();
  const [dragging, setDragging] = useState(false);
  const hoverText = 'Drop files here';
  const disabledDropHoverText =
    'Cannot drop files. Synchronization is in progress.';
  const formats = Object.values(ModelFileExtension);

  interface MessageProps {
    show: boolean;
    text: string | null;
    type: string | null;
  }
  const [message, setMessage] = useState<MessageProps>({
    show: false,
    text: null,
    type: null,
  });

  const drop = useRef(null);
  const drag = useRef(null);

  useEffect(() => {
    handleWorkflowStatus(workflowStatus);
    if (workflowStatus?.message === 'Uploading file to iTwin Storage') {
      setMessage({ show: true, text: 'Uploading files', type: 'success' });
    } else if (workflowStatus) {
      setTimeout(() => {
        setMessage({
          show: false,
          text: null,
          type: null,
        });
      }, 1500);
    }
  }, [workflowStatus]);

  useEffect(() => {
    showDefaultOverlay
      ? setMessage({ show: true, text: hoverText, type: '' })
      : setMessage({
          show: false,
          text: null,
          type: null,
        });
  }, [showDefaultOverlay]);

  useEffect(() => {
    // @ts-ignore
    drop.current.addEventListener('dragover', handleDragOver);
    // @ts-ignore
    drop.current.addEventListener('drop', handleDrop);
    // @ts-ignore
    drop.current.addEventListener('dragenter', handleDragEnter);
    // @ts-ignore
    drop.current.addEventListener('dragleave', handleDragLeave);

    return () => {
      // @ts-ignore
      drop.current.removeEventListener('dragover', handleDragOver);
      // @ts-ignore
      drop.current.removeEventListener('drop', handleDrop);
      // @ts-ignore
      drop.current.removeEventListener('dragenter', handleDragEnter);
      // @ts-ignore
      drop.current.removeEventListener('dragleave', handleDragLeave);
    };
  }, [disableDropping, areRunsLoading]);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (
      e.target !== drag.current &&
      e.dataTransfer?.items?.[0]?.kind === 'file' &&
      !areRunsLoading
    ) {
      setDragging(true);
    }
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.target === drag.current) {
      setDragging(false);
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setDragging(false);
    if (!areRunsLoading && !disableDropping) {
      const files = e.dataTransfer ? Array.from(e.dataTransfer.files) : [];
      if (
        formats &&
        files.some(
          (file: File) =>
            !formats.some(format =>
              file.name.toLowerCase().endsWith(format.toLowerCase())
            )
        )
      ) {
        showMessage('Allowed file types: ' + formats.join(', '), 'error', 3000);

        return;
      }
      if (files.length !== 0) {
        uploadAndSynchronize(files);
      }
    }
  };

  const showMessage = (text: string, type: string, timeout: number) => {
    setMessage({
      show: true,
      text,
      type,
    });

    setTimeout(
      () =>
        setMessage({
          show: false,
          text: null,
          type: null,
        }),
      timeout
    );
  };

  return (
    <div ref={drop} className="drag-and-drop-container">
      {message.show && (
        <div className={'container-message '.concat(`${message.type}-message`)}>
          {message.text}
        </div>
      )}
      {dragging &&
        (disableDropping ? (
          <div ref={drag} className="container-message error-message">
            {disabledDropHoverText}
          </div>
        ) : (
          <div ref={drag} className="container-message">
            {hoverText}
          </div>
        ))}
      {children}
    </div>
  );
};
