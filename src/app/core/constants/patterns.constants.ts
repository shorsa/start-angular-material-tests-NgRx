
export class PatternsConstants {
    static readonly PATTERN_EMAIL = /^[a-z0-9]+((\.[a-z0-9]+)*|(-[a-z0-9]+)*|(_[a-z0-9]+)*)@[a-z0-9]+((-[a-z0-9]+)*|(_[a-z0-9]+)*)*\.[a-z]{2,}$/;
    static readonly PATTERN_PASSWORD = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;
    static readonly PATTERN_FIRST_NAME = /^([A-Za-z`'-]+){3,30}$/;
    static readonly PATTERN_LAST_NAME = /^([A-Za-z`'-]+){3,50}$/;
    static readonly PATTERN_PHONE_NUMBER = /(\d{0,3})(\d{0,3})(\d{0,4})/;
}
