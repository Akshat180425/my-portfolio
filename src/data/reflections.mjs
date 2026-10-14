// Proposed interpretations, commissioned by Akshat for review. These are not
// approved personal testimony or claims about an author's private intentions.
// Set status to 'published' only after Akshat has reviewed an individual entry.
const draft = (paragraphs, excerpt) => ({ status: 'draft', paragraphs, ...(excerpt ? { excerpt } : {}) });

export const influenceReflections = {
  'Adi Shankara': draft([
    'I read this question as an invitation to loosen my grip on the descriptions I use for myself. A role, an achievement, or a disappointment can describe part of a life without exhausting what that life is.',
    'The metaphor I return to is a changing sky: naming each cloud does not tell me everything about the space in which it appears. This is a starting point for my reflection, not a complete account of Shankara’s philosophy.',
  ]),
  'Albert Camus': draft([
    'I read happiness here as a possibility within repetition, rather than a reward waiting after it. The task may not change, but the person carrying it can still have a relationship with it that is not entirely dictated by defeat.',
    'The question this leaves me with is whether accepting a difficult reality can coexist with refusing to surrender my response to it. I would want to distinguish that acceptance from simply calling every hardship necessary.',
  ]),
  'Buddha': draft([
    'I read this passage as placing ethical responsibility close to home: in the choices I make, the habits I repeat, and the harm I can choose to stop adding.',
    'That does not mean every misfortune is deserved or under personal control. The distinction that matters to me is between being responsible for my actions and imagining I am responsible for everything that happens to me.',
  ]),
  'Dante Alighieri': draft([
    'Memory can sharpen an absence because it supplies the very thing the present is missing. Remembered happiness becomes both evidence that something mattered and a measure of the distance from it.',
    'I do not read this as a reason to erase the past. I read it as a description of why gratitude and grief can arrive together, without either making the other dishonest.',
  ], { poem: 'lost', stanza: 0, lines: [1] }),
  'Franz Kafka': draft([
    'The doorway makes me think about permission: the permission an institution withholds, and the permission a person gradually learns to withhold from themselves. In the story, waiting becomes a life rather than a brief interruption of it.',
    'I would not reduce that to “just walk through.” Power is real. What unsettles me is how difficult it becomes to tell an external obstacle from the habits that grow around it.',
  ]),
  'Friedrich Nietzsche': draft([
    'I read the image of a dancing star as form emerging from something unsettled. Contradiction and uncertainty may become material for creation, without making disorder valuable for its own sake.',
    'The useful question for me is what I make from an intense feeling. Expression asks for attention and craft as well as intensity; pain alone is not a finished work.',
  ]),
  'Fyodor Dostoevsky': draft([
    'This question makes me hesitate before treating one action as a complete explanation of a person. Conviction and doubt, tenderness and resentment, can exist uncomfortably close together.',
    'Understanding those contradictions need not excuse their consequences. I am interested in the space between a quick judgement and an unlimited forgiveness: the effort to understand clearly while still holding someone accountable.',
  ]),
  'George R. R. Martin': draft([
    'The question separates courage from a lack of fear. If there is nothing to fear, an action may not demand the same kind of resolve.',
    'I read it as permission to begin before feeling completely ready. The caution is that bravery still needs judgement: being afraid does not make every risk worthwhile, just as being afraid does not make every worthwhile risk impossible.',
  ]),
  'Homer': draft([
    'I read home as a relationship between a place, the people in it, and the person who returns. The address may remain familiar even when the traveller no longer fits the life they left.',
    'That makes return a kind of meeting rather than a simple reversal of departure. The question I want to hold open is whether belonging can survive change without requiring either side to pretend that nothing happened.',
  ]),
  'Leo Tolstoy': draft([
    'The smallness of a choice can hide its repetition. What I attend to, avoid, forgive, or postpone may shape a life more persistently than the few moments I recognise as turning points.',
    'I read the question as a way of bringing values into an ordinary day. A principle becomes more concrete when I can ask what it changes about the next conversation or the next hour.',
  ]),
  'Marcus Aurelius': draft([
    'I read the two halves together: things change, and I meet those changes through an interpretation. That interpretation can be examined even when the event itself cannot be undone.',
    'This does not make loss imaginary. It asks whether the first story I tell about an event must also be the final one. The room for agency may be small, but it is still worth noticing.',
  ]),
  'Miguel de Cervantes': draft([
    'Imagination can give an ordinary life a larger horizon. It can also become a way of protecting a cherished story from whatever contradicts it.',
    'I want to keep both possibilities in view. The question is not whether to imagine, but whether an imagined world helps me attend more carefully to the people in front of me or makes them disappear behind the roles I have assigned them.',
  ]),
  'Oscar Wilde': draft([
    'The image makes hope a direction of attention rather than proof that the situation is already good. Looking upward does not erase where the speaker is standing.',
    'I like the possibility of holding circumstance and aspiration in the same sentence. Hope feels more honest when it can acknowledge the ground beneath it, rather than requiring me to describe difficulty as something beautiful.',
  ]),
  'Plato & Socrates': draft([
    'I read examination as the willingness to ask why I believe something, especially when the belief is convenient. A life can be full of activity while its reasons remain largely borrowed.',
    'For me, the useful version of this question should lead back into living. Reflection becomes less helpful when it turns into an endless requirement to justify every feeling before allowing myself to experience it.',
  ]),
  'Shiv Kumar Batalvi': draft([
    'Absence becomes tangible when language gives it a place to live: a room, a road, a repeated gesture. The missing person need not be described directly for the world around them to retain their shape.',
    'This is a way I want to think about my own writing too. A particular detail can carry a feeling more patiently than an explanation of how intense that feeling is.',
  ], { poem: 'lost', stanza: 2, lines: [1] }),
  'Søren Kierkegaard': draft([
    'Looking back gives events a pattern that was unavailable while they were happening. The difficulty is that decisions still have to be made before that pattern becomes clear.',
    'I read this as a reason for humility toward earlier versions of myself. Learning from a decision is different from pretending I could have possessed all of its later meaning in advance.',
  ]),
  'Sylvia Plath': draft([
    'The repetition draws my attention to existence before explanation. A person does not need to produce a persuasive account of their life in order for that life to matter.',
    'I read the rhythm as a return to something immediate and bodily. I would want to leave room for the passage’s context without turning either a fictional voice or an author’s life into a single emblem of suffering.',
  ]),
  'William Shakespeare': draft([
    'I hear a warning about repeatedly living through an imagined ending. Fear can occupy the present long before the feared event arrives.',
    'But these are Caesar’s words in a dramatic scene, not an instruction to dismiss every warning. That tension matters: composure can become arrogance when courage is used as a reason to stop listening.',
  ]),
};

export const fragmentReflections = {
  'nothing-wasted': draft([
    'The distinction I want to explore is between giving pain a use and calling the pain itself a gift. Making something from an experience does not retrospectively make the experience kind.',
    'A wail might become a poem, a clearer boundary, or simply a more attentive way of hearing someone else. None of those possibilities requires gratitude toward what caused it.',
  ]),
  'room-with-boundaries': draft([
    'Here, the heart and the principles are allowed to speak differently. Affection can remain even after an action has become impossible to excuse.',
    'I read the room as emotional space, not an invitation without conditions. The line leaves open the possibility that forgiveness, access, trust, and love may each move at a different pace.',
  ]),
  'when-nothing-happens': draft([
    'An empty moment can give memory the space that activity had occupied. The return is not always triggered by an anniversary or a dramatic encounter; sometimes the interruption is simply silence.',
    'I would like this line to leave room for that ordinary rhythm of remembering. A quiet day can still be full of an earlier life.',
  ], { poem: 'lost', stanza: 0, lines: [0] }),
  'peaceful-nights': draft([
    'The line imagines distance as a form of care. Becoming a stranger is not the same as suddenly feeling nothing; it is an action taken while the feeling is still present.',
    'The question I would keep beside it is where generosity ends and self-erasure begins. Another person’s peace matters, but the speaker’s existence should not have to become an apology.',
  ], { poem: 'hijr', stanza: 2, lines: [2] }),
  'keep-walking': draft([
    'The road offers no guarantee here. Continuing is grounded in the worth of the purpose, rather than a promise that effort will be rewarded on schedule.',
    'I would not want persistence to mean refusing rest or refusing a better route. The purpose can remain while the pace, method, or direction changes.',
  ]),
  'a-prayer-for-her': draft([
    'The two sets of tears create an uneven tenderness: the speaker is hurting while still wishing to spare the other person hurt.',
    'I read it as a moment of feeling, not a rule that one person must always carry the pain for both. The care in the line becomes more humane when it is allowed to include the person offering it.',
  ]),
  'unlived-tomorrows': draft([
    'There are two losses in the sentence: the relationship’s possible ending, and the future already furnished in the imagination. Accepting one does not automatically empty the rooms of the other.',
    'The metaphor can extend beyond love to a place, a vocation, or a version of life. An imagined future may never have happened and still have occupied real emotional space.',
  ]),
  'the-measure-of-integrity': draft([
    'Achievement is visible from the outside; some of the refusals that protect a person’s character may never be noticed. The line asks that both be counted.',
    'I would want integrity to remain concrete here: not merely a flattering description of myself, but a question about the methods I accept and the costs I ask other people to carry.',
  ]),
  'beyond-the-darkness': draft([
    'The movement is deliberately small. The speaker has not become certain, fearless, or healed; they have begun to doubt the completeness of the darkness.',
    'Light can mean possibility before it means happiness. I want the line to make room for a beginning that does not have to perform confidence in order to be real.',
  ]),
  'familiar-roads': draft([
    'The body remembers a route after the reasons for taking it have changed. Habit becomes a kind of map drawn by an earlier life.',
    'I read the road both literally and as a metaphor for returning to old conversations, expectations, or versions of myself. Knowing the way back does not necessarily mean that going back is still right.',
  ], { poem: 'lost', stanza: 2, lines: [0, 1] }),
  'hope-accompanied': draft([
    'Hope has not disappeared; it has lost its solitude. The sentence allows wanting something and fearing its cost to occupy the same emotional space.',
    'I would like to resist making either voice the final authority. Fear can offer information without becoming a command, and hope can offer direction without becoming a guarantee.',
  ]),
  'a-quiet-prayer': draft([
    'The requested miracle is inward: enough courage for an unspoken feeling to become speakable. The heavens frame how large a small act can feel from the outside.',
    'I would keep one limit in view: silence does not prove a hidden answer. The line expresses a wish, not a claim to know what another person feels or owes.',
  ]),
  'choose-your-fire': draft([
    'The first question is not how much suffering I can endure, but whether I have chosen what the suffering is for. A difficult path does not become meaningful merely because it is difficult.',
    'I read the inner war as the struggle to remain answerable to my own values. The line asks me to examine the destination before making endurance itself the proof of courage.',
  ]),
  'an-inward-flame': draft([
    'Waiting for a sunrise can become a way of giving all possibility to circumstances. The flame represents the smaller action that remains available before the world changes.',
    'I would not read this as a demand for constant self-sufficiency. Help can matter deeply. The point I want to explore is how receiving help and exercising agency can coexist.',
  ]),
  'what-i-found': draft([
    'The sentence begins with an account of gain and loss, then changes what is being counted. The answer is a person discovered within the speaker, rather than a relationship kept or lost.',
    'That discovery need not redeem everything that happened. I want to leave room for growth without treating the hurt that preceded it as a necessary price or an explanation for someone else’s choices.',
  ]),
  'once-a-home': draft([
    'A destination belongs to a future; a home may belong to a past that was still real. The sentence makes room to relinquish one without falsifying the other.',
    'I read it as a form of truthful separation. Moving forward does not require declaring that a place never sheltered me, even if I can no longer live there.',
  ]),
  'the-cost-of-returning': draft([
    'The visible loss is the relationship. The less visible cost is the version of the self that had been disappearing inside it.',
    'I would want this to express self-recovery rather than a contest over who suffered more. The decision can remain necessary even when the world never receives a complete explanation of it.',
  ]),
  'a-distance-i-can-survive': draft([
    'Distance is measured here by what it allows the speaker to retain. Love may continue, but the form in which it is lived has to leave room for dignity.',
    'I read this as an adjustment of access rather than a performance of indifference. The feeling is not denied; it is given a boundary within which a person can keep being themselves.',
  ]),
  'a-world-of-reminders': draft([
    'Private effort meets a public world that has kept its associations. A place, a song, or an ordinary question can bring back what deliberate distraction had temporarily quietened.',
    'The line is interested in that difference of scale. The mind can choose its next task more easily than it can renegotiate the meaning of every familiar thing.',
  ], { poem: 'lost', stanza: 1, lines: [1] }),
  'one-impossible-second': draft([
    'A small gesture interrupts the ordinary measurement of time. Eternity is personified so that the scale of the feeling can exceed the scale of the event.',
    'I would leave the moment small rather than explain it into a declaration. Its force comes from how briefly attention makes the rest of the world seem to pause.',
  ]),
  'learning-to-see': draft([
    'Moonlight stands for something beautiful that can be pursued without quite knowing what the pursuit is for. The presence in the sentence changes the eyes before it changes the landscape.',
    'I read this as an image of recognition, not proof that one person must supply all meaning. It asks how a meeting can clarify a longing that existed before the meeting itself.',
  ]),
  'two-kinds-of-waiting': draft([
    'The scene contains two directions of attention. One person waits for the sky to reveal something; the other waits to be noticed beside them.',
    'The moon and clouds let longing remain indirect. I would want to preserve that asymmetry without making the other person cruel simply for looking somewhere else: the ache belongs to an unmet hope.',
  ]),
  'love-and-the-right-decision': draft([
    'Explanation and justification are separated here. A feeling can make a decision understandable without settling whether that decision was good for the person making it.',
    'I read the line as permission to revise an earlier choice without mocking the love that informed it. Honesty about affection and honesty about consequences do not have to cancel each other.',
  ]),
};

export const reflectionSearchText = reflection => reflection?.paragraphs.join(' ') || '';
