/*
Functional programming is often misunderstood to be defined as something that is
opposite of OO. This is incorrect, FP is a paradigm with pros and cons and tools
and patterns that should be understood for what they are and applied without any
dogmatic adherence to one style or paradigm of programming over another.

Starting simply, let's create a summary description of what constitues FP that
is good enough for most cases. We'll go into each bullet in turn, don't worry if
the jargon goes over your head.

According to: https://clojurefun.wordpress.com/2012/08/27/what-defines-a-functional-programming-language/
A functional programming language is a language that emphasises programming with pure functions and immutable data.

According to: https://en.wikipedia.org/wiki/Functional_programming
Functional programming:
1. Is a declarative programming paradigm
2. The output value of a function depends only on the input to the function (the definition of a Pure Function)
Note: "this is in contrast to procedures depending on a local or global state, which may produce
different results at different times when called with the same arguments but a different program state"
3. An extension of "lambda calculus"

So to summarize, in functional programming:
1. Every function should be pure
2. All data structures are immutable
3. Every function should be composable with any other


And go through each point with examples.
*/

/*
As a note before we jump into the code, functional programming has a reputation
for being a highly mathematical style of programming, a fact that scala peddling
neckbeards will fall over themselves to remind you of. While there is an extremely
rich world of combinatoric logic right below the surface of functional programming,
it's as mathy as you make it and you can be the biggest FP acolyte without ever
looking at a math equation if that's not your cup of tea.
*/

// Always start with every JS dev's best friend
const _ = require('lodash');

/* 1. Every function should be pure
This is one of those concepts that is so simple and straightforward that it actually confuses people
because, if you're like me, its hard to shake off the suspicion that you don't *really* understand what it *really* means.

As quoted from Wikipedia above, a Pure Function:
1. Guarantees the same output given the same input
2. Has no side effects

Let's look at the first rule:
*/

// This is a pure function
function pureAddition(num1, num2) {
    console.log(num1 + num2)

    return num1 + num2
}

/*
If I call pureAddition(1, 5) I will get 6 no matter what codebase, OS, or planet I'm invoking it from.

But again, this is so obvious you might wonder why even bother to explicitly define it.
Well, let's look at what might make this function impure.
*/

function impureAddition(num1, num2) {
    if (process.env['num1']) {
        num1 = process.env['num1']
    }

    console.log(num1 + num2)
    return num1 + num2
}

/*
In this contrived example, our function depends on an environment variable, which could have been set
anywhere and anytime.

Let's say I call inconsistentAddition(2, 5)
*/
function inconsistentAddition(num1, num2) {
    impureAddition(num1, num2)
    // 7

    // Now I change my environment
    process.env['num1'] = 200

    impureAddition(num1, num2)
    //205
}

/*
If it's not completely clear how this would translate to a real world scenario, later
we'll work through an example using traditional OO classes and objects to demonstrate
how desctructive an impure function can be if you design your code around the expectation that
all functions will be pure.
*/

/*
Part 2 of the pure function axiom states that a Pure Function won't produce any side effects.

Its fair to think of this as the converse of the first rule about pure functions, which
could be restated to say that a pure function shouldn't have side effects.

In the same way a pure function won't depend on anything other than exactly what was passed in
to it, a pure function won't do anything at all other return its output.

So let's rewrite our inconsistentAddition function to emphasize this point
 */

 function inconsistentAddition(num1, num2) {
     process.env['num1'] = 200

     return impureAddition(num1, num2)
     //205
 }

/*
We're altering our environment and returning the result of impureAddition! That sounds like a side effect to me!
Well,now this is following rule 1 of Pure Functions, because if we call inconsistentAddition,
it will always set num1 to 200. But what if we call inconsistentAddition and then call impureAddition
on its own? impureAddition will return a crazy result, because impureAddition breaks rule 1 of Pure Functions
which made it vulnerable when we called inconsistentAddition, which breaks rule 2 of Pure Functions.
*/

/*
2. Every data structure should be immutable

*/
//TODO unfinished
// My data structure is an array of arrays of primitive floats
let myDataStructure = [1, 2, 3];

console.log('Using the functional style map method')

let myNewDataStructure = myDataStructure.map((number) => number * 1000)

console.log('I get a new data structure back, which I called myNewDataStructure');
console.log(myNewDataStructure);




// My data structure is an array of arrays of primitive floats
myDataStructure = [1, [2, 3], [4, [5, 6]]]
function compose(f, g) {
    return function(data) {
        return f(g(data));
    }
}

const flatMap = compose(_.flatten, _.map);

console.log(flatMap(myDataStructure))
