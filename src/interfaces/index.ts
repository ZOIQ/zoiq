import { FormProps } from "antd";

export interface StyleGuideValues {
  // Type - Typography
  fontFamilyPrimary: string;
  fontFamilySecondary: string;

  fontSizeBanner: number;
  fontSizeTitle: number;
  fontSizeSubtitle: number;
  fontSizeBody: number;
  fontSizeSmall: number;
  fontSizeNavbar: number;

  fontWeightBanner: number;
  fontWeightTitle: number;
  fontWeightSubtitle: number;
  fontWeightBody: number;
  fontWeightSmall: number;
  fontWeightNavbar: number;

  lineHeightBanner: number;
  lineHeightTitle: number;
  lineHeightSubtitle: number;
  lineHeightBody: number;
  lineHeightSmall: number;
  lineHeightNavbar: number;

  letterSpacingBanner: number;
  letterSpacingTitle: number;
  letterSpacingSubtitle: number;
  letterSpacingBody: number;
  letterSpacingSmall: number;
  letterSpacingNavbar: number;

  textTransformBanner: string;
  textTransformTitle: string;
  textTransformSubtitle: string;
  textTransformBody: string;
  textTransformSmall: string;
  textTransformNavbar: string;

  // Type - Colors
  /**
   * @description Used for actions and primary buttons. interactive elements
   */
  primary: string;

  /**
   * @description Used for decorative elements
   */
  secondary: string;

  /**
   * @description Used for main background
   */
  darkest: string;

  /**
   * @description Used for alternative background
   */
  dark: string;

  /**
   * @description Used for decorative borders. Forms, Inputs etc.
   */
  medium: string;

  /**
   * @description Used for non decorative borders. Dividers etc.
   */
  light: string;

  /**
   * @description Used for secondary text
   */
  lightest: string;

  /**
   * @description Used for heading text
   */
  white: string;

  // Type - Forms
  tabsTop: boolean;
  inputPerRow: 1 | 2;
  size: FormProps["size"];
  labelAlign: FormProps["labelAlign"];
  layout: FormProps["layout"];
}

export enum StyleGuideType {
  COLORS = "COLORS",
  TYPOGRAPHY = "TYPOGRAPHY",
  FORMS = "FORMS",
}

export type StyleGuide = {
  id: string;
  name: string;
  type: StyleGuideType;
  value: string;
  organizationID: string;
  projectID?: string | null;
  extraInfo?: string | null;
  createdAt: string;
  updatedAt: string;
};
