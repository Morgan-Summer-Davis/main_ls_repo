let Header  = ({ name }) => <h1>{name}</h1>;
let Section = ({ name, exercises, id }) => <li> {name} {exercises} </li>
let Total   = ({ total }) => <p>total of {total} exercises</p>

let Course  = ({ course }) => {
  return (
    <div key={course.id}>
      <Header name={course.name} />
      <ul>
      {course.parts.map(part => {
        return <Section key={part.id} name={part.name} exercises={part.exercises} />
      })}
      </ul>
      <Total total={course.parts.reduce((total, part) => part.exercises + total, 0)} />
    </div>
  );
}

export default Course;