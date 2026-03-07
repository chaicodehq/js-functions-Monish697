/**
 * 🎬 Bollywood Scene Director - Factory Functions
 *
 * Bollywood ka script generator bana! Factory functions use karo — matlab
 * aise functions jo DOOSRE functions return karte hain. Pehle configuration
 * do, phir ek specialized function milega jo kaam karega.
 *
 * Functions:
 *
 *   1. createDialogueWriter(genre)
 *      - Factory: returns a function (hero, villain) => string
 *      - Genres and their dialogue templates:
 *        "action"  => `${hero} says: 'Tujhe toh main dekh lunga, ${villain}!'`
 *        "romance" => `${hero} whispers: '${villain}, tum mere liye sab kuch ho'`
 *        "comedy"  => `${hero} laughs: '${villain} bhai, kya kar rahe ho yaar!'`
 *        "drama"   => `${hero} cries: '${villain}, tune mera sab kuch cheen liya!'`
 *      - Unknown genre => return null (not a function, just null)
 *      - Returned function: if hero or villain empty/missing, return "..."
 *
 *   2. createTicketPricer(basePrice)
 *      - Factory: returns a function (seatType, isWeekend = false) => price
 *      - Seat multipliers: silver=1, gold=1.5, platinum=2
 *      - Agar isWeekend, multiply final price by 1.3 (30% extra)
 *      - Round to nearest integer
 *      - Unknown seatType in returned fn => return null
 *      - Agar basePrice not positive number => return null (not a function)
 *
 *   3. createRatingCalculator(weights)
 *      - Factory: returns a function (scores) => weighted average
 *      - weights: { story: 0.3, acting: 0.3, direction: 0.2, music: 0.2 }
 *      - scores: { story: 8, acting: 9, direction: 7, music: 8 }
 *      - Weighted avg = sum of (score * weight) for matching keys
 *      - Round to 1 decimal place
 *      - Agar weights not an object => return null
 *
 * Hint: A factory function RETURNS another function. The returned function
 *   "remembers" the parameters of the outer function (this is a closure!).
 *
 * @example
 *   const actionWriter = createDialogueWriter("action");
 *   actionWriter("Shah Rukh", "Raees")
 *   // => "Shah Rukh says: 'Tujhe toh main dekh lunga, Raees!'"
 *
 *   const pricer = createTicketPricer(200);
 *   pricer("gold", true)  // => 200 * 1.5 * 1.3 = 390
 */
export function createDialogueWriter(genre) {
    let dialogue;
    if (genre === "action") {
        dialogue = (hero, villain) =>
            `${hero} says: 'Tujhe toh main dekh lunga, ${villain}!'`;
    } else if (genre === "romance") {
        dialogue = (hero, villain) =>
            `${hero} whispers: '${villain}, tum mere liye sab kuch ho'`;
    } else if (genre === "comedy") {
        dialogue = (hero, villain) =>
            `${hero} laughs: '${villain} bhai, kya kar rahe ho yaar!'`;
    } else if (genre === "drama") {
        dialogue = (hero, villain) =>
            `${hero} cries: '${villain}, tune mera sab kuch cheen liya!'`;
    } else {
        return null;
    }
    return function (hero, villain) {
        if (!hero || !villain) {
            return "...";
        }
        return dialogue(hero, villain);
    };
}

export function createTicketPricer(basePrice) {
    if (basePrice <= 0) {
        return null;
    }
    return function (seatType, isWeekend = false) {
        let price = 0;
        let SeatMultiplier = 0;
        if (seatType === "silver") {
            SeatMultiplier = 1;
        } else if (seatType === "gold") {
            SeatMultiplier = 1.5;
        } else if (seatType === "platinum") {
            SeatMultiplier = 2;
        } else {
            return null;
        }
        price = basePrice * SeatMultiplier;
        if (isWeekend === true) {
            price = price * 1.3;
        }
        price = Math.round(price);
        return price;
    };
}

export function createRatingCalculator(weights) {
    //   3. createRatingCalculator(weights)
    //  *      - Factory: returns a function (scores) => weighted average
    //  *      - weights: { story: 0.3, acting: 0.3, direction: 0.2, music: 0.2 }
    //  *      - scores: { story: 8, acting: 9, direction: 7, music: 8 }
    //  *      - Weighted avg = sum of (score * weight) for matching keys
    //  *      - Round to 1 decimal place
    //  *      - Agar weights not an object => return null
    if (typeof weights !== "object" || !weights) {
        return null;
    }
    return function (scores) {
        // Weighted avg = sum of (score * weight) for matching keys
        let Weighted = 0;

        for (let score in scores) {
            Weighted = Weighted + weights[score] * scores[score];
        }

        // let WeightedAvg = Weighted / Number(Object.keys.length);
        Weighted = Number(Weighted.toFixed(1));

        return Weighted;
    };
}
