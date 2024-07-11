import { CourseLevel } from "@rds-auth/models/user.enum";

export interface AccountDomain {
  /** A list of the user's addresses. The maximum allowed data size is 10Kb. */
  addresses?: [
    {
      /** The address type. Acceptable values: custom, home, other, work. */
      type: 'custom' | 'home' | 'other' | 'work';
      /** The street address, such as 1600 Amphitheatre Parkway. Whitespace within the string is ignored; however, newlines are significant. */
      streetAddress: string;
      /** Indicates if the user-supplied address was formatted. Formatted addresses are not currently supported. */
      sourceIsStructured: boolean;
      /** The abbreviated province or state. */
      region: string;
      /** If this is the user's primary address. The addresses list may contain only one primary address. */
      primary: boolean;
      /** The ZIP or postal code, if applicable. */
      postalCode: string;
      /** The post office box, if present. */
      poBox: string;
      /** The town or city of the address. */
      locality: string;
      /** A full and unstructured postal address. This is not synced with the structured address fields. */
      formatted: string;
      /** For extended addresses, such as an address that includes a sub-region. */
      externalAddress: string;
      /** If the address type is custom, this property contains the custom value. */
      customType: string;
      /** The country code. Uses the ISO 3166-1 standard. */
      countryCode: string;
      /** Country. */
      country: string;
    }
  ];
  /** Output only. This property is true if the user has completed an initial login and accepted the Terms of Service agreement. */
  agreedToTerms?: boolean;
  /**  Output only. asps.list of the user's alias email addresses. */
  aliases?: string[];
  /**Indicates if user is archived. */
  archived?: boolean;
  /** Indicates if the user is forced to change their password at next login. This setting doesn't apply when the user signs in via a third-party identity provider. */
  changePasswordAtNextLogin?: boolean;
  /**Output only. The time the user's account was created. The value is in ISO 8601 date and time format. The time is the complete date plus hours, minutes, and seconds in the form YYYY-MM-DDThh:mm:ssTZD. For example, 2010-04-05T17:30:04+01:00. */
  creationTime?: string;
  /** Custom fields of the user. customSchemas.(key) is a nested object. customSchemas.(key).(key) can be any value. */
  customSchemas?: any;
  /** Output only. The customer ID to retrieve all account users. You can use the alias my_customer to represent your account's customerId. As a reseller administrator, you can use the resold customer account's customerId. To get a customerId, use the account's primary domain in the domain parameter of a users.list request. */
  customerId?: string;
  /** Output only. The time the user's account was deleted. The value is in ISO 8601 date and time format. The time is the complete date plus hours, minutes, and seconds in the form YYYY-MM-DDThh:mm:ssTZD. For example 2010-04-05T17:30:04+01:00. */
  deletionTime?: string;
  /** A list of the user's email addresses. The maximum allowed data size is 10Kb. */
  emails?: [
    {
      /** The user's email address. Also serves as the email ID. This value can be the user's primary email address or an alias. */
      address: string;
      /** If the value of type is custom, this property contains the custom type string. */
      customType: string;
      /** Indicates if this is the user's primary email. Only one entry can be marked as primary. */
      primary: boolean;
      /** The type of the email account. Acceptable values: custom, home, other, work. */
      type: 'custom' | 'home' | 'other' | 'work';
    }
  ];
  /** Output only. ETag of the resource. */
  etag?: string;
  /** A list of external IDs for the user, such as an employee or network ID. The maximum allowed data size is 2Kb.   */
  externalIds?: [
    {
      /** If the external ID type is custom, this property holds the custom type. */
      customType: string;
      /** The type of the ID. Acceptable values: account, custom, customer, login_id, network, organization. */
      type:
      | 'account'
      | 'custom'
      | 'customer'
      | 'login_id'
      | 'network'
      | 'organization';
      /**  The value of the ID.*/
      value: string;
    }
  ];
  /** The user's gender. The maximum allowed data size for this field is 1Kb. */
  gender?: any;
  /** Stores the hash format of the password property. We recommend sending the password property value as a base 16 bit hexadecimal-encoded hash value. Set the hashFunction values as either the SHA-1, MD5, or crypt hash format. */
  hashFunction?: string;
  /** The unique ID for the user. A user id can be used as a user request URI's userKey. */
  id?: string;
  /** The user's Instant Messenger (IM) accounts. A user account can have multiple ims properties. But, only one of these ims properties can be the primary IM contact. The maximum allowed data size is 2Kb. */
  ims?: [
    {
      /** If the protocol value is custom_protocol, this property holds the custom protocol's string. */
      customProtocol: string;
      /** If the IM type is custom, this property holds the custom type string. */
      customType: string;
      /** The user's IM network ID. */
      im: string;
      /** If this is the user's primary IM. Only one entry in the IM list can have a value of true. */
      primary: boolean;
      /** An IM protocol identifies the IM network. The value can be a custom network or the standard network. Acceptable values: aim: AOL Instant Messenger protocol custom_protocol: A custom IM network protocol gtalk: Google Talk protocol icq: ICQ protocol jabber: Jabber protocol msn: MSN Messenger protocol net_meeting: Net Meeting protocol qq: QQ protocol skype: Skype protocol yahoo: Yahoo Messenger protocol */
      protocol: string;
      /** Acceptable values: custom, home, other, work. */
      type: 'custom' | 'home' | 'other' | 'work';
    }
  ];
  /** Indicates if the user's profile is visible in the Google Workspace global address list when the contact sharing feature is enabled for the domain. For more information about excluding user profiles, see the administration help center. */
  includeInGlobalAddressList?: boolean;
  /** If true, the user's IP address is whitelisted. */
  ipWhitelisted?: boolean;
  /** Output only. Indicates a user with super admininistrator privileges. The isAdmin property can only be edited in the Make a user an administrator operation ( makeAdmin method). If edited in the user insert or update methods, the edit is ignored by the API service. */
  isAdmin?: boolean;
  /** Output only. Indicates if the user is a delegated administrator. Delegated administrators are supported by the API but cannot create or undelete users, or make users administrators. These requests are ignored by the API service. Roles and privileges for administrators are assigned using the Admin console. */
  isDelegatedAdmin?: boolean;
  /** Output only. Is enrolled in 2-step verification (Read-only) */
  isEnforcedIn2Sv?: boolean;
  /** Output only. Is 2-step verification enforced (Read-only) */
  isEnrolledIn2Sv?: boolean;
  /** Output only. Indicates if the user's Google mailbox is created. This property is only applicable if the user has been assigned a Gmail license. */
  isMailboxSetup?: boolean;
  /** A list of the user's keywords. The maximum allowed data size is 1Kb. */
  keywords?: [
    {
      /** Custom Type. */
      customType: string;
      /** Each entry can have a type which indicates standard type of that entry. For example, keyword could be of type occupation or outlook. In addition to the standard type, an entry can have a custom type and can give it any name. Such types should have the CUSTOM value as type and also have a customType value. Acceptable values: custom, mission, occupation, outlook. */
      type: 'custom' | 'mission' | 'occupation' | 'outlook';
      /** Keyword. */
      value: string;
    }
  ];
  /** Output only. The type of the API resource. For Users resources, the value is admin#directory#user. */
  kind?: string;
  /** A list of the user's languages. The maximum allowed data size is 1Kb. */
  languages?: [
    {
      /** Other language. A user can provide their own language name if there is no corresponding Google III language code. If this is set, LanguageCode can't be set. */
      customLanguage: string;
      /** Language Code. Should be used for storing Google III LanguageCode string representation for language. Illegal values cause SchemaException. */
      languageCode: string;
    }
  ];
  /** Output only. The last time the user logged into the user's account. The value is in ISO 8601 date and time format. The time is the complete date plus hours, minutes, and seconds in the form YYYY-MM-DDThh:mm:ssTZD. For example, 2010-04-05T17:30:04+01:00. */
  lastLoginTime?: string;
  /** A list of the user's locations. The maximum allowed data size is 10Kb. */
  locations?: [
    {
      /** Textual location. This is most useful for display purposes to concisely describe the location. For example, Mountain View, CA or Near Seattle. */
      area: string;
      /** Building identifier. */
      buildingId: string;
      /** If the location type is custom, this property contains the custom value. */
      customType: string;
      /** Most specific textual code of individual desk location. */
      deskCode: string;
      /** Floor name/number. */
      floorName: string;
      /** Floor section. More specific location within the floor. For example, if a floor is divided into sections A, B, and C, this field would identify one of those values. */
      floorSection: string;
      /** The location type. Acceptable values: custom, default, desk. */
      type: 'custom' | 'default' | 'desk';
    }
  ];
  /** Holds the given and family names of the user, and the read-only fullName value. The maximum number of characters in the givenName and in the familyName values is 60. In addition, name values support unicode/UTF-8 characters, and can contain spaces, letters (a-z), numbers (0-9), dashes (-), forward slashes (/), and periods (.). For more information about character usage rules, see the administration help center. Maximum allowed data size for this field is 1Kb. */
  name?: {
    /** The user's full name formed by concatenating the first and last name values. */
    fullName: string;
    /** The user's last name. Required when creating a user account. */
    familyName: string;
    /** The user's first name. Required when creating a user account. */
    givenName: string;
  };
  /** Output only. asps.list of the user's non-editable alias email addresses. These are typically outside the account's primary domain or sub-domain. */
  nonEditableAliases?: string[];
  /** Notes for the user as a nested object. */
  notes?: [
    {
      /** Content type of note, either plain text or HTML. Default is plain text. Acceptable values: text_plain, text_html. */
      contentType: 'text_plain' | 'text_html';
      /** Contents of notes. */
      value: string;
    }
  ];
  /** The full path of the parent organization associated with the user. If the parent organization is the top-level, it is represented as a forward slash (/). */
  orgUnitPath?: string;
  /** A list of organizations the user belongs to. The maximum allowed data size is 10Kb. */
  organizations?: [
    {
      /** The cost center of the user's organization. */
      costCenter: string;
      /** If the value of type is custom, this property contains the custom type.*/
      customType: string;
      /** Specifies the department within the organization, such as sales or engineering. */
      department: string;
      /** The description of the organization. */
      description: string;
      /** The domain the organization belongs to. */
      domain: string;
      /** The full-time equivalent millipercent within the organization (100000 = 100%). */
      fullTimeEquivalent: number;
      /** The physical location of the organization. This does not need to be a fully qualified address. */
      location: string;
      /** The name of the organization. */
      name: string;
      /** Indicates if this is the user's primary organization. A user may only have one primary organization. */
      primary: boolean;
      /** Text string symbol of the organization. For example, the text symbol for Google is GOOG. */
      symbol: string;
      /** The user's title within the organization. For example, member or engineer. */
      title: string;
      /** The type of organization. Acceptable values: domain_only, school, unknown, work. */
      type: string;
    }
  ];
  /** Stores the password for the user account. The user's password value is required when creating a user account. It is optional when updating a user and should only be provided if the user is updating their account password. A password can contain any combination of ASCII characters. A minimum of 8 characters is required. The maximum length is 100 characters. We recommend sending the password property value as a hexadecimal-encoded hash value and setting hashFunction accordingly. If a hashFunction is specified, the password must be a valid hash key. The password value is never returned in the API's response body. */
  password?: any;
  /** A list of the user's phone numbers. The maximum allowed data size is 1Kb. */
  phones?: [
    {
      /** If the value of type is custom, this property contains the custom type. */
      customType: string;
      /** Indicates if this is the user's primary phone number. A user may only have one primary phone number. */
      primary: boolean;
      /** The type of phone number. */
      type:
      | 'assistant'
      | 'callback'
      | 'car'
      | 'company_main'
      | 'custom'
      | 'grand_central'
      | 'home'
      | 'home_fax'
      | 'isdn'
      | 'main'
      | 'mobile'
      | 'other'
      | 'other_fax'
      | 'pager'
      | 'radio'
      | 'telex'
      | 'tty_tdd'
      | 'work'
      | 'work_fax'
      | 'work_mobile'
      | 'work_pager';
      /** A human-readable phone number. It may be in any telephone number format. */
      value: string;
    }
  ];
  /** A list of POSIX account information for the user. */
  posixAccounts?: [
    {
      /** A POSIX account field identifier. */
      accountId: string;
      /** The GECOS (user information) for this account. */
      gecos: string;
      /** The default group ID. */
      gid: string;
      /** The path to the home directory for this account. */
      homeDirectory: string;
      /** The operating system type for this account. Acceptable values: linux, unspecified, windows. */
      operatingSystemType: 'linux' | 'unspecified' | 'windows';
      /** If this is user's primary account within the SystemId. */
      primary: boolean;
      /** The path to the login shell for this account. */
      shell: string;
      /** System identifier for which account Username or Uid apply to. */
      systemId: string;
      /** The POSIX compliant user ID. */
      uid: string;
      /** The username of the account. */
      username: string;
    }
  ];
  /** The user's primary email address. This property is required in a request to create a user account. The primaryEmail must be unique and cannot be an alias of another user. */
  primaryEmail?: string;
  /** Recovery email of the user. */
  recoveryEmail?: string;
  /** Recovery phone of the user. The phone number must be in the E.164 format, starting with the plus sign (+). Example: +16506661212. */
  recoveryPhone?: string;
  /** A list of the user's relationships to other users. The maximum allowed data size for this field is 2Kb. */
  relations?: [
    {
      /** If the value of type is custom, this property contains the custom type. */
      customType: string;
      /** The type of relation. Acceptable values: admin_assistant, assistant, brother, child, custom, domestic_partner, dotted_line_manager, exec_assistant, father, friend, manager, mother, parent, partner, referred_by, relative, sister, spouse. */
      type: 'admin_assistant' | 'assistant' | 'brother' | 'child';
      custom;
      domestic_partner;
      dotted_line_manager;
      exec_assistant;
      father;
      friend;
      manager;
      mother;
      parent;
      partner;
      referred_by;
      relative;
      sister;
      spouse;
    }
  ];
  /** A list of the user's addresses. The maximum allowed data size is 10Kb. A list of SSH public keys. */
  sshPublicKeys?: [
    {
      /** An expiration time in microseconds since epoch. */
      expirationTimeUsec: number;
      /** A SHA-256 fingerprint of the SSH public key. (Read-only) */
      fingerprint: string;
      /** An SSH public key. */
      key: string;
    }
  ];
  /** Indicates if user is suspended. */
  suspended?: boolean;
  /** Output only. Has the reason a user account is suspended either by the administrator or by Google at the time of suspension. The property is returned only if the suspended property is true. */
  suspensionReason?: string;
  /** Output only. ETag of the user's photo (Read-only) */
  thumbnailPhotoEtag?: string;
  /** Output only. Photo Url of the user (Read-only) */
  thumbnailPhotoUrl?: string;
  /** A list of the user's websites. The maximum allowed data size is 2Kb. */
  userKey?: string;
  websites?: [
    {
      /** The custom type. Only used if the type is custom. */
      customType: string;
      /** If this is user's primary website or not. */
      primary: boolean;
      /** The type or purpose of the website. For example, a website could be labeled as home or blog. Alternatively, an entry can have a custom type. Custom types must have a customType value. Acceptable values: app_install_page, blog, custom, ftp, home, home_page, other, profile, reservations, resume, work. */
      type:
      | 'app_install_page'
      | 'blog'
      | 'custom'
      | 'ftp'
      | 'home'
      | 'home_page'
      | 'other, profile'
      | 'reservations'
      | 'resume'
      | 'work';
      /** The URL of the website. */
      value: string;
    }
  ];
}

export interface UserPhoto {
  id: string;
  primaryEmail: string;
  kind: string;
  etag: string;
  photoData: string;
  mimeType: string;
  width: number;
  height: number;
}
export interface UserResponse {
  users: AccountDomain[];
  etag: string;
  kind: string;
  trigger_event: string;
  nextPageToken: string;
}
export interface UserName {
  fullName: string;
  familyName: string;
  givenName: string;
}

export interface Permission {
  permission: string;
}

export interface UserStudent {
  id?: string;
  priority?: number;
  name: UserName;
}

export interface UserTeacher {
  id?: string;
  priority?: number;
  name: UserName;
}
export interface Group {
  id: string;
  priority?: number;
  grade?: string;
  level?: CourseLevel;
  teachers?: AccountDomain[];
  students?: AccountDomain[];
  email: string;
  name: string;
  description: string;
  adminCreated: boolean;
  directMembersCount: string;
  kind: string;
  etag: string;
  aliases: string[];
  nonEditableAliases: string[];
}

export interface GroupResponse {
  groups: Group[];
  etag: string;
  kind: string;
  nextPageToken: string;
}
export interface UserInsert {
  id?: string;
  name: {
    familyName: string;
    givenName: string;
  };
  password: string;
  primaryEmail?: string;
}
