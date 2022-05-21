export interface User {
    displayName: string;
    id: string;
    mail: string;
    userPrincipalName: string;
    preferredLanguage: string;
    jobTitle: string;
    businessPhones: string[];
    officeLocation: string | null;
    isLiscenced: boolean;
}
