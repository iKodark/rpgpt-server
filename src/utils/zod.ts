import { ZodIssue } from "zod";

const formatErrors = (issues: Array<ZodIssue>) => {
  return issues.map((error) => (
    {
      message: error.message,
      key: error.path[0]
    }
  ));
}

export {
  formatErrors
}