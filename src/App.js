import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App(){
    const [dice,setDice]=React.useState(allNewDice())
    const [tenzies,setTenzies]=React.useState(false)

    function newDice(){
        return {
            value: Math.ceil(Math.random()*6),
            isHeld: false,
            id: nanoid()
        }
    }

    function allNewDice(){
        const array=[]
        for(let i=0;i<10;i++){
            let a=newDice()
            array.push(a)
        }
        return array
    }

    let diceElements = dice.map(ele => <Die key={ele.id} click={() => holdDice(ele.id)} held={ele.isHeld} value={ele.value}/>)

    function handleClick(){
        setDice(!tenzies ? prevDice => prevDice.map(die =>{
            return die.isHeld ? die : newDice()
        }) : allNewDice())
    }
    
    function holdDice(id){
        setDice(oldDie => oldDie.map(die => {
            return die.id===id ? {...die,isHeld: !die.isHeld} : die
        }))
    }

    React.useEffect(()=>{
        const dieValue=dice[0].value
        const allHeld=dice.every(die => die.isHeld)
        const allSame=dice.every(die => die.value===dieValue)
        if(allHeld && allSame){
            setTenzies(true)
        }
        else{
            setTenzies(false)
        }
    },[dice,tenzies])


    return(
        <div className="background-screen">
            {tenzies && <Confetti/>}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">
                {
                !tenzies ? "Roll until all dice are the same. Click each die to freeze it at its current value between rolls."
                    :
                "You Won!!"
                }                
            </p>
            <div className="game-screen">
                {diceElements}
            </div>
            <button className="die-roll-button" onClick={handleClick}>
                {tenzies ? "New Game" : "Roll"}
            </button>
        </div>
    )
}