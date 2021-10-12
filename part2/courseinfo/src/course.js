

function Header({course}){
    return <h2>{course}</h2>
  }
  
  function Content({parts}){
     return (
       parts.map(part=> <Part key={part.id} part={part.name} 
        exercises={part.exercises} />
        ));
  }
  
  function Part({part,exercises}){
    return <p>
          {part} {exercises}
           </p>
  }
  
  function Total({parts}){
    const total= parts.reduce((sum,part)=>sum + part.exercises, 0)
    return ( <p> Number of exercises {total}</p>);
  }
  
  function CourseInfo({course}){
    return (<>
    <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
      </>);
  }
  
  export default function Course({courses}){
    return courses.map(course=><CourseInfo key={Course.id} course={course}/>)
  }