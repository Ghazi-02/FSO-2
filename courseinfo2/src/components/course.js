const Course = (props) => {


    return (
      <div>
  
        <Header course={props.course.name} />
        <Content parts={props.course.parts}/>
        <Total total ={props.course.parts} />
  
      </div>
    )
  }

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

const Total= ({total}) => {
 

  return(
    <div>
      It has {total.reduce(function (acc, curr) {
    return acc + curr.exercises
  }, 0)} exercises
    </div>
  )
}


  export default Course 