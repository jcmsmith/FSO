interface CourseDetails {
  name: string;
  exerciseCount: number;
}

interface CourseParts {
  courseParts: Array<CourseDetails>;
}

export const Content = ({ courseParts }: CourseParts) => {
  return (
    <div>
      {" "}
      <p>
        {courseParts[0].name} {courseParts[0].exerciseCount}
      </p>
      <p>
        {courseParts[1].name} {courseParts[1].exerciseCount}
      </p>
      <p>
        {courseParts[2].name} {courseParts[2].exerciseCount}
      </p>
    </div>
  );
};

export const Total = ({ courseParts }: CourseParts) => {
  return (
    <div>
      {" "}
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  );
};
