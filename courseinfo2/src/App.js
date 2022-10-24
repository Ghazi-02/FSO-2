const Header = ({ course }) => <h1>{course}</h1>


const Part = ({ part }) => {
  console.log(part)
  return (
    <div>
      {part.name} {part.exercises}
    </div>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(item => (<Part part={item} />))}
    </div>)
}

const Course = (props) => {
 

  return (
    <div>

      <Header course = {props.course.name}/>
      <Content parts = {props.course.parts} />

    </div>
  )
}
function App() {

  const course = {
    id: 1,
    name: 'Half Stack application development ',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },

    ]
  }
  return (

    <div>
 

      <Course course={course} />
    </div>
  )
}

export default App