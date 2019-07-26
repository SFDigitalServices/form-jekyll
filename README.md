# Form Prototype - ADU


### Options

| Option   | Description                                                                           | Expected format       |
|----------|---------------------------------------------------------------------------------------|-----------------------|
| label    | The field's label                                                                     | Plain text            |
| helptext | The field's help text                                                                 | Plain text / Markdown |
| type     | The input type. For a full list of fields, see the file names in `_includes/fields.`  | Plain text            |
| options  | The possible answers for `radio`, `checkbox`, and `select` fields.                    | A list of options     |
| checked  | Determines whether any field under `options` should be checked by default.            | `true`                |
| optional | Determines whether a field is optional                                                | `true`                |
| error    | The custom error message that should display if the field is invalid or blank.        | Plain text            |
| shows    | The name of the `group` that should be conditionally shown if this field is checked.  | The name of a `group` |
| shows    | The name of the `group` that should be conditionally hidden if this field is checked.  | The name of a `group` |