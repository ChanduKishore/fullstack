import {useState} from 'react';

function Button({handleClick,text}){
  return <button onClick={handleClick}>{text}</button>
}

function StatisticLine({text,value}){
  return <div>{text} {value}</div>
}

function Statistics({good,bad,neutral}){
    
    const total=good+neutral+bad;
    const average=(good-bad)/total;
    const posFB =(good/total)*100;
    if(total===0){
      return<div> No feedback given</div>
    }
  
    return(
      <>
      <StatisticLine text='Good' value={good}/>
      <StatisticLine text='Neutral' value={neutral}/>
      <StatisticLine text='Bad' value={bad}/>
      <StatisticLine text='All' value={total} />
      <StatisticLine text='Average' value={average.toFixed(1)} />
      <StatisticLine text='Positive' value={posFB.toFixed(1)+'%'} />
      </>);
    
}

function App() {
  const [good,setGood]=useState(0);
  const [neutral,setNeutral]=useState(0);
  const [bad,setBad]=useState(0);
  
  return (
    <>
    <h1>Give Feedback </h1>
    <Button handleClick={()=>{setGood(good+1)}} text='good'/>
    <Button handleClick={()=>{setNeutral(neutral+1)}} text='neutral'/>
    <Button handleClick={()=>{setBad(bad+1)}} text='bad'/>
    <h2>Statistics</h2>
    <Statistics good={good} bad={bad} neutral={neutral} />
    
    </>
  );
}

export default App;
