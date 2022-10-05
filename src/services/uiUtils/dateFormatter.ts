/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

export const utcTimeStringToFormattedDateTime = (time: string | null) => {
  return time != null && time !== '0001-01-01T00:00:00Z'
    ? getFormattedDateAndTime(new Date(time))
    : '';
};

export const getFormattedDateAndTime = (dateTime: Date): string =>
  dateTime.toLocaleTimeString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
