import { css } from '@emotion/react';

const variables = css`
  :root {
    /* shades */
    --black: #000;
    --white: #fff;
    --grey-01: #d2d2d4;
    --grey-02: #8c8c8c;
    --grey-03: #666;
    --grey-05: #979797;
    --grey-06: #4d4d4d;

    /* colors */
    --dark-blue: #171824;
    --foreground-dark-blue: #212131;
    --foreground-lighter-dark-blue: #28283c;
    --green: #28c7b7;
    --dim-green: #0a9d8b;
    --pink: #f9b2c8;
    --dark-red: #951010;
    --red: #eb4162;

    /* horizontal rule */
    --dim-grey-line: #38384e;

    /* platform colors */
    --platform-nes: #eb3f0f;
    --platform-snes: #8775a8;
    --platform-n64: #f0ac00;
    --platform-gcn: #505abf;
    --platform-wii: #0eb5e9;
    --platform-wiiu: #009ac7;
    --platform-nsw: #e70012;
    --platform-fam: #7f0708;
    --platform-sfc: #06ab69;
    --platform-gb: #872944;
    --platform-gbc: #9668a8;
    --platform-gba: #5d60a8;
    --platform-nds: #004cd9;
    --platform-dsi: #26b5d3;
    --platform-3ds: #cf181d;
    --platform-n3ds: #ce017c;
    --platform-sms: #ce4636;
    --platform-sg: #ab1b01;
    --platform-sat: #b64672;
    --platform-dc: #f46a3c;
    --platform-smd: #00a23f;
    --platform-gg: #d2469f;
    --platform-ps1: #00ac9f;
    --platform-ps2: #3a46ea;
    --platform-ps3: #aa343c;
    --platform-ps4: #0151a1;
    --platform-ps5: #0646de;
    --platform-psp: #894097;
    --platform-vita: #006bb9;
    --platform-other: #4f5e83;

    /* action colors */
    --error-01: var(--red);

    /* disabled opacity */
    --disabled: 0.2;

    /* font sizes (body) */
    --body-font-size-00: 0.625rem; /* 10px */
    --body-font-size-01: 0.75rem; /* 12px */
    --body-font-size-02: 0.875rem; /* 14px */
    --body-font-size-03: 16px;
    --body-font-size-04: 18px;
    --body-font-size-05: 1.25rem; /* 20px */

    /* font sizes (titles) */
    --title-font-size-06: 1.5rem; /* 24px */
    --title-font-size-07: 2rem; /* 32px */
    --title-font-size-11: 2.5rem; /* 40px */
    --title-font-size-12: 3.5rem; /* 56px */

    /* font styles */
    --emphasized: italic;
    --font-weight-light: 100;
    --font-weight-normal: 400;
    --font-weight-bold: 600;
    --font-weight-bolder: 800;

    /* spacing */
    --spacing-01: 0.25rem;
    --spacing-02: 0.5rem; /*8px */
    --spacing-03: 0.75rem; /* 12px */
    --spacing-04: 1rem; /* 16px */
    --spacing-05: 1.25rem; /* 20px */
    --spacing-06: 1.5rem; /* 24px */
    --spacing-07: 2rem; /* 32px */
    --spacing-08: 3rem; /* 48px */
    --spacing-09: 4rem; /* 64px */

    /* layout */
    --layout-01: var(--spacing-04);
    --layout-02: var(--spacing-06);
    --layout-03: var(--spacing-07);
    --layout-04: var(--spacing-08);
    --layout-05: 64px;
    --layout-06: 96px;
    --layout-07: 120px;
    --layout-08: 150px;
    --layout-09: 160px;
    --layout-10: 175px;

    /* toolbar height */
    --toolbar-height: 2.25rem; /* 36px */

    /* theme colors */
    --dark-theme-bg-primary: var(--dark-blue);
    --dark-theme-bg-secondary: var(--green);
    --dark-theme-bg-tertiary: var(--pink);
    --dark-theme-bg-quaternary: var(--grey-05);
    --dark-theme-platform-primary: var(--dark-red);

    /* Break points */
    --xs-breakpoint: 320px;
    --s-breakpoint: 480px;
    --m-breakpoint: 768px;
    --l-breakpoint: 1024px;
    --xl-breakpoint: 1224px;
    --max-breakpoint: 1440px;

    /* Typography */
    --body-font-family-primary: 'Open Sans', sans-serif;
  }
`;

export default variables;
