


const Header = ({ course }) => <h1>{course}</h1>

const Part = ({ part }) => {
 
  return (
    <div>
      {part.name} {part.exercises}
    </div>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(item => (<Part part={item} key={item.id} />))}
    </div>)
}

const Course = (props) => {


  return (
    <div>

      <Header course={props.course.name} />
      <Content parts={props.course.parts}/>
      <Total total ={props.course.parts} />

    </div>
  )
}
const Total= ({total}) => {
 

  return(
    <div>
      It has {total.reduce(function (acc, curr) {
    return acc + curr.exercises
  }, 0)} exercises
    </div>
  )
}



const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    },


  ]



return (

    <div>

      {courses.map(item => {
        return (
          
          <Course course={item} key={courses.indexOf(item)}/>
          
        )
      })
      }



    </div>
  )
};

export default App