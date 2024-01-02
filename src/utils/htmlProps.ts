/** https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete */
export type AutoComplete =
  | "given-name"
  | "family-name"
  | "honorific-suffix"
  | "email"
  | "bday-year"
  | "bday-month"
  | "bday-day"
  | "new-password";

type GlobalAllowList = "title";

type ElementTestProps = { testId?: string };

export const testIdAttribute = "data-test-id";
export function generateTestId(testId?: string): {
  [testIdAttribute]?: string;
} {
  return { [testIdAttribute]: testId };
}

export type HTMLProps<
  Element extends keyof React.ReactHTML,
  AllowList extends keyof PropsFor<Element>,
> = Pick<PropsFor<Element>, GlobalAllowList | AllowList> & ElementTestProps;

export type ElementProps = Pick<
  React.AllHTMLAttributes<unknown>,
  GlobalAllowList
> &
  ElementTestProps;

type PropsFor<Element extends keyof React.ReactHTML> = ReturnType<
  React.ReactHTML[Element]
>["props"];
