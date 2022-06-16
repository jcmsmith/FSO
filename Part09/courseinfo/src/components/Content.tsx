import { CoursePart, assertNever } from "../courseData";

interface CourseParts {
  courseParts: Array<CoursePart>;
}

export const Content = ({ courseParts }: CourseParts) => {
  return (
    <>
      {courseParts.map((part: CoursePart) => {
        return (
          <div key={part.name}>
            <Part {...part} />
            <br /> <br />
          </div>
        );
      })}
    </>
  );
};

export const Total = ({ courseParts }: CourseParts) => {
  return (
    <div>
      <p>
        Total number of exercises:{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  );
};

const Part = (part: CoursePart) => {
  switch (part.type) {
    case "normal":
      return (
        <div>
          <h2>{part.name}</h2>
          <p>{part.description}</p>
          <p> Exercises: {part.exerciseCount}</p>
          <p>type: {part.type}</p>
        </div>
      );
    case "groupProject":
      return (
        <div>
          <h2>{part.name}</h2>
          <p> Exercises: {part.exerciseCount}</p>
          <p> Group projects: {part.groupProjectCount}</p>
          <p>type: {part.type}</p>
        </div>
      );

    case "submission":
      return (
        <div>
          <h2>{part.name}</h2>
          <p>{part.description}</p>
          <p> Exercises: {part.exerciseCount}</p>
          <p> Submit to: {part.exerciseSubmissionLink}</p>
          <p>type: {part.type}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <h2>{part.name}</h2>
          <p>{part.description}</p>
          <p> Exercises: {part.exerciseCount}</p>
          <>
            Required skills:
            {part.requirements.map((req) => {
              return <p key={req}>{req}</p>;
            })}
          </>
          <p>type: {part.type}</p>
        </div>
      );
    default:
      return assertNever(part);
  }
};
