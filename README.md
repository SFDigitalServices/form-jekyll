# form-jekyll

### Goals of this tool

- Designers can prototype, comment, and iterate on forms as easily as they might a Google Doc.

- Designers can easily give external stakeholders a realistic preview of how a form will work.

### What is it?

`form-jekyll` is a Jekyll theme that lets you easily build a prototype of an SF.GOV form in a YAML file. Right now, it lets you add:

- Multiple field types
- Custom error messages
- Custom input widths, tied to the `maxlength` attribute
- Conditionals for radio buttons, checkboxes, and text fields
- "Less than" or "greater than" conditionals for number fields
- Markdown-formatted content


Since YAML is easy to read, non-technical colleagues can easily give feedback on form design and content inside a GitHub pull request. And because GitHub Pages uses Jekyll, you can easily deploy a form to a webpage and send the link to external stakeholders.

### Example

```
- title: Page Title
  fields:
  - label: Name

  - label: Phone number
    type: phone
    error: You need to enter a valid phone number.

  - label: Do you have an email address?
    type: radio
    options:
    - label: Yes
      shows: email-field

    - label: No
      hides: email-field

  - group: email-field
    fields:
    - label: Enter your email address here
      type: email

  - label: How did you hear about us?
    optional: true
```

### Field properties

| Property&nbsp;name   | Description                                                                           | Expected format       |
|----------|---------------------------------------------------------------------------------------|-----------------------|
| `title` | The title of the current page | Plain text |
| `fields` | The fields within a page or `group`. | A nested list of fields |
| `label`    | The field's label                                                                     | Plain text            |
| `helptext` | The field's help text                                                                 | Markdown |
| `type`     | The input type. For a full list of fields, see the file names in `_includes/fields.`  | Plain text            |
| `options`  | The possible answers for `radio`, `checkbox`, and `select` fields.                    | A list of options     |
| `checked`  | Determines whether a radio or checkbox option should be checked by default.            | `true`                |
| `optional` | Determines whether a field is optional                                                | `true`                |
| `other` | Determines whether a set of radio buttons or checkboxes has an "Other" option | `true` |
| `error`    | The custom error message that should display if the field is invalid or blank.        | Plain text            |
| `shows`    | The name of the `group` that should be conditionally shown if this field is checked.  | The name of a `group` |
| `level`    |  The header level for `header` fields. For example, `level: 1` will produce an H1. | A number between `1` and `5`|
| `group` | The name of the group of fields you wish to conditionally show or hide. | Plain text |
| `size` | The vertical height of a textarea | `small`, `medium` or `large` |
| `unit` | The desired units of a number field (e.g. "yards", "liters", "days") | Plain text |
| `url` | The URL of a link. | Plain text |
| `maxlength` | The maximum character length of a number or text field. | A number between `1` and `15` |
| `if` | The logic that will trigger a conditional for a free-text field. | <ul><li markdown="1">Plain text or a number (for exact matches)</li><li markdown="1">`<X` to match all numbers less than X (e.g. `<49`)</li><li markdown="1">`>X` to match all numbers greater than X (e.g. `>49`)</li> |
| `address-fields` | The inputs to show in an address fields. (All inputs are visible by default.) | A nested list containing `street`, `city`, `state` and `zip` |




### Local development

- Setup Jekyll - https://jekyllrb.com/docs/installation/
- Install Gemfile - `bundle install`
- Run Jekyll - `bundle exec jekyll serve`