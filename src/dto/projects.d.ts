/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface definitions {
  'team-member': {
    userId?: string;
    email?: string;
    givenName?: string;
    surname?: string;
    organization?: string;
    roles?: string[];
  };
  'team-members': {
    members?: definitions['team-member'][];
    _links?: definitions['Links'];
  };
  Role: {
    id?: string;
    name?: string;
    description?: string;
    permissions?: string[];
  };
  Roles: {
    value?: definitions['Role'][];
  };
  /** Minimal representation of a project that contains only id, displayName and projectNumber. */
  'project-summary': {
    /** The Project Id. */
    id?: string;
    /** The display name for the project. */
    displayName?: string;
    /** The unique number or code for the project. This is the value that uniquely identifies the project within your organization. */
    projectNumber?: string;
  };
  /** Full representation of a project. */
  Project: {
    /** The Project Id. */
    id?: string;
    /** The display name for the project. */
    displayName?: string;
    /** The unique number or code for the project. This is the value that uniquely identifies the project within your organization. */
    projectNumber?: string;
    /** The date that the project was created. */
    registrationDateTime?: string;
    /** The Id of the user the created the project. */
    registeredBy?: string;
    /** The address or text description of the location of the project. */
    geographicLocation?: string;
    /** The latitude in degrees from -90 to 90. */
    latitude?: string;
    /** The latitude in degrees from -180 to 180. */
    longitude?: string;
    /** The timezone that is being used on the project. */
    timeZone?: string;
    /** The data center where the project data will be stored. */
    dataCenterLocation?: string;
    /** The ISO-3166 country code representing the billing country for this project. */
    billingCountry?: string;
    status?: definitions['ProjectStatus'];
    /** If false, then only users from the organization that owns whe project can be given access to the project. If true, then users from external organizations can be given access to the project. */
    allowExternalTeamMembers?: boolean;
    _links?: definitions['project-links'];
  };
  /** A list of projects in the minimal representation format. */
  'projects-prefer-return-minimal': {
    /** A list of projects in the minimal representation format. */
    projects?: definitions['project-summary'][];
  };
  /** A list of projects in the full representation format. */
  'projects-prefer-return-representation': {
    /** A list of projects in the full representation format. */
    projects?: definitions['Project'][];
  };
  Errors: {
    errors?: { [key: string]: unknown }[];
  };
  Links: {
    next?: definitions['Link'];
  };
  /** Hyperlink container. */
  Link: {
    /** Hyperlink container. */
    href?: string;
  };
  'team-member-add-by-ids': {
    /** ID of user to add.  If used, cannot pass email or roleNames. */
    userId: string;
    /** An array of role IDs that will be assigned to new team member. */
    roleIds?: string[];
  };
  'team-member-add-by-names': {
    /** Email address of the user to add.  If used, cannot pass userId or roleIds. */
    email: string;
    /** An array of role names that will be assigned to new team member */
    roleNames?: string[];
  };
  'team-member-roles-update': {
    roleIds: string[];
  };
  'role-create': {
    displayName: string;
    description?: string;
  };
  'role-update': {
    displayName?: string;
    description?: string;
    permissions?: string[];
  };
  /** Hyperlinks to related data for this project. */
  'project-links': {
    storage?: definitions['Link'];
    forms?: definitions['Link'];
    issues?: definitions['Link'];
    imodels?: definitions['Link'];
  };
  /** Properties of the project to be created. */
  'project-create': {
    /** A display name for the project. Max Length: 255 characters */
    displayName: string;
    /** A unique number or code for the project. This is the value that uniquely identifies the project within your organization. Max Length: 255 characters */
    projectNumber: string;
    /** The address or text description of the location of the project. Max Length: 255 characters */
    geographicLocation?: string;
    /** The latitude in degrees from -90 to 90 */
    latitude?: string;
    /** The latitude in degrees from -180 to 180 */
    longitude?: string;
    /** The timezone that is being used on the project. This should be any Id returned from System.TimeZoneInfo.GetSystemTimeZones() */
    timeZone?: string;
    /** A valid ISO-3166 country code. Max Length: 2 characters. The default value is ZZ. */
    billingCountry?: string;
    status?: definitions['ProjectStatus'];
    /** If false, then only users from the organization that owns whe project can be given access to the project. If true, then users from external organizations can be given access to the project. Users can be given access by using the 'Add project team member' API. The default value is false. */
    allowExternalTeamMembers?: boolean;
  };
  /** One of 'active', 'inactive', 'trial' */
  ProjectStatus: 'active' | 'inactive' | 'trial';
  /** Properties of the project to be updated. */
  'project-update': {
    /** A display name for the project. Max Length: 255 characters */
    displayName?: string;
    /** A unique number or code for the project. This is the value that uniquely identifies the project within your organization. Max Length: 255 characters */
    projectNumber?: string;
    /** The address or text description of the location of the project. Max Length: 255 characters */
    geographicLocation?: string;
    /** The latitude in degrees from -90 to 90 */
    latitude?: string;
    /** The latitude in degrees from -180 to 180 */
    longitude?: string;
    /** The timezone that is being used on the project. This should be any Id returned from System.TimeZoneInfo.GetSystemTimeZones() */
    timeZone?: string;
    /** A valid ISO-3166 country code. Max Length: 2 characters */
    billingCountry?: string;
    status?: definitions['ProjectStatus'];
    /** If false, then only users from the organization that owns whe project can be given access to the project. If true, then users from external organizations can be given access to the project. Users can be given access by using the 'Add project team member' API. The default value is false. */
    allowExternalTeamMembers?: boolean;
  };
  /** List of permission user has on a given project */
  Permissions: {
    permissions?: string[];
  };
}
