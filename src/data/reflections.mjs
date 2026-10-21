import { libraryContexts } from './library-contexts.mjs';

// Proposed interpretations, commissioned by Akshat for review. These are not
// approved personal testimony or claims about an author's private intentions.
// Set status to 'published' only after Akshat has reviewed an individual entry.
const draft = (paragraphs, excerpt) => ({ status: 'draft', paragraphs, ...(excerpt ? { excerpt } : {}) });
const reading = (name, paragraphs, excerpt) => ({ ...draft(paragraphs, excerpt), context: libraryContexts[name] });

export const influenceReflections = {
  'Adi Shankara': reading('Adi Shankara', [
    'I read this question as an invitation to loosen my grip on the descriptions I use for myself. A role, an achievement, or a disappointment can describe part of a life without exhausting what that life is.',
    'My everyday way into this is the space between having a thought and becoming its description of me. That is a modest personal connection to a much larger metaphysical claim; it makes me more careful about treating a passing state as my whole identity.',
  ]),
  'Albert Camus': reading('Albert Camus', [
    'What stays with me is the walk back down. The task has not become fair, but Sisyphus sees it clearly and still has an inward response of his own. I hear defiance in that happiness.',
    'For me, the line loosens the link between meaning and a final victory. Effort can hold dignity even without a promised ending. That does not require me to call every hardship necessary or every burden worth keeping.',
  ]),
  'Buddha': reading('Buddha', [
    'I read this passage as placing ethical responsibility close to home: in the choices I make, the habits I repeat, and the harm I can choose to stop adding.',
    'That does not mean every misfortune is deserved or under personal control. The distinction that matters to me is between being responsible for my actions and imagining I am responsible for everything that happens to me.',
  ]),
  'Dante Alighieri': reading('Dante Alighieri', [
    'Francesca’s remembered happiness makes absence feel precise. A memory can preserve what mattered while making its distance from the present almost unbearable. Gratitude and grief can arrive together.',
    'Her account also makes me notice the stories people tell around their choices. I can be moved by someone’s pain and still ask what their telling leaves out. That tension gives the line more depth than a simple statement about nostalgia.',
  ], { poem: 'lost', stanza: 0, lines: [1] }),
  'Franz Kafka': reading('Franz Kafka', [
    'The doorway makes me think about permission: the permission an institution withholds, and the permission a person gradually learns to withhold from themselves. In the story, waiting becomes a life rather than a brief interruption of it.',
    'I would not reduce that to “just walk through.” Power is real. What unsettles me is how difficult it becomes to tell an external obstacle from the habits that grow around it.',
  ]),
  'Friedrich Nietzsche': reading('Friedrich Nietzsche', [
    'I read the image of a dancing star as form emerging from something unsettled. Contradiction and uncertainty may become material for creation, without making disorder valuable for its own sake.',
    'Beside the last man, the line also makes me ask whether the comfort I seek leaves room for discovery. I want to turn an unsettled feeling into attention, craft, or a changed way of living, rather than mistake intensity itself for creation.',
  ]),
  'Fyodor Dostoevsky': reading('Fyodor Dostoevsky', [
    'The Underground Man makes self-awareness feel less reassuring. Being able to describe a contradiction does not necessarily free a person from it. I recognise a question worth carrying: when does explaining myself become a way to avoid changing?',
    'Understanding those contradictions need not excuse their consequences. I am interested in the space between a quick judgement and an unlimited forgiveness: the effort to understand clearly while still holding someone accountable.',
  ]),
  'George R. R. Martin': reading('George R. R. Martin', [
    'The question separates courage from a lack of fear. If there is nothing to fear, an action may not demand the same kind of resolve.',
    'Bran’s uncertainty makes the idea feel human enough to use. I can begin before feeling completely ready, while still asking whether the action deserves courage. A difficult choice needs judgement as well as resolve.',
  ]),
  'Homer': reading('Homer', [
    'The rooted bed makes belonging tangible to me. What proves home is a detail held between two people, something a stranger could not reproduce simply by arriving at the right address.',
    'I read return as a meeting between changed lives. The question I want to hold open is whether belonging can survive change without requiring either person to pretend that the years between them never happened.',
  ]),
  'Leo Tolstoy': reading('Leo Tolstoy', [
    'The smallness of a choice can hide its repetition. What I attend to, avoid, forgive, or postpone may shape a life more persistently than the few moments I recognise as turning points.',
    'Gerasim gives that thought a practical form. Being present, telling the truth gently, and doing an uncomfortable task can express a value more clearly than a respectable appearance. I want to ask what my principles change about the next conversation or the next hour.',
  ]),
  'Marcus Aurelius': reading('Marcus Aurelius', [
    'I read the two halves together: things change, and I meet those changes through an interpretation. That interpretation can be examined even when the event itself cannot be undone.',
    'This does not make loss imaginary. It asks whether the first story I tell about an event must also be the final one. The room for agency may be small, but it is still worth noticing.',
  ]),
  'Miguel de Cervantes': reading('Miguel de Cervantes', [
    'Imagination can give an ordinary life a larger horizon. It can also become a way of protecting a cherished story from whatever contradicts it.',
    'The explanation about the enchanter is what catches me: even a collision can become evidence for the original fantasy. I want my imagination to remain answerable to other people and to what happens, with enough openness to revise a story I love.',
  ]),
  'Oscar Wilde': reading('Oscar Wilde', [
    'The image makes hope a direction of attention rather than proof that the situation is already good. Looking upward does not erase where the speaker is standing.',
    'Knowing who speaks it keeps me attentive to the difference between beautiful language and trustworthy conduct. I can keep the upward glance while asking whether my actions deserve the generous story I tell about myself.',
  ]),
  'Plato & Socrates': reading('Plato & Socrates', [
    'I read examination as the willingness to ask why I believe something, especially when the belief is convenient. A life can be full of activity while its reasons remain largely borrowed.',
    'The trial gives that willingness a cost. It asks whether I would keep examining a belief when doing so threatens comfort or approval. I want reflection to lead back into action, with the courage to revise what I can no longer honestly defend.',
  ]),
  'Shiv Kumar Batalvi': reading('Shiv Kumar Batalvi', [
    'The bird’s departure hurts because the poem has first made its presence so vivid. I read that as a lesson in how an image can carry what an explanation cannot: a missing person leaves colours, gestures, and sensations behind.',
    'This is a way I want to think about my own writing too. A particular detail can carry a feeling more patiently than an explanation of how intense that feeling is.',
  ], { poem: 'lost', stanza: 2, lines: [1] }),
  'Søren Kierkegaard': reading('Søren Kierkegaard', [
    'Looking back gives events a pattern that was unavailable while they were happening. The difficulty is that decisions still have to be made before that pattern becomes clear.',
    'The longer entry also unsettles the comfort of hindsight: my present explanation may be revised again. I read that as a reason for humility toward earlier versions of myself, and for making the next decision without demanding a certainty that living cannot supply.',
  ]),
  'Sylvia Plath': reading('Sylvia Plath', [
    'At the funeral, the rhythm feels both fragile and insistent to me. Esther’s body continues to assert a presence while she is facing another person’s absence. That makes the repetition quieter, and more moving, than a declaration of triumph.',
    'I hear permission to begin with the fact of being here before knowing what to make of everything. A life can matter while its future remains uncertain; it does not first owe the world a complete explanation.',
  ]),
  'William Shakespeare': reading('William Shakespeare', [
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
  'a-distance-i-can-survive': draft([
    'Distance is measured here by what it allows the speaker to retain. Love may continue, but the form in which it is lived has to leave room for dignity.',
    'I read this as an adjustment of access rather than a performance of indifference. The feeling is not denied; it is given a boundary within which a person can keep being themselves.',
  ]),
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

export const reflectionSearchText = reflection => [
  ...(reflection?.paragraphs || []),
  reflection?.context?.work || '',
  ...(reflection?.context?.paragraphs || []),
].join(' ');
