import React from "react";
import Image from "next/image";

export type Chapter = {
  id: string;
  title: string;
  romanNumeral: string;
  mood?: "chapter1" | "chapter2" | "chapter3";
  pages: Page[];
};

export type Page = {
  id: string;
  content: React.ReactNode;
  isChapterOpening?: boolean;
};

export const MANUSCRIPT: Chapter[] = [
  {
    id: "chapter-1",
    title: "AFFECTION",
    romanNumeral: "I",
    mood: "chapter1",
    pages: [
      {
        id: "c1-p1",
        content: (
          <div className="book-content">
            <div className="w-full h-48 sm:h-56 relative mb-6 rounded-sm overflow-hidden shadow-xl border border-[var(--color-border-subtle)]">
              <Image src="/images/classroom.jpg" alt="Dark Gothic Classroom" fill sizes="(max-width: 768px) 100vw, 50vw" priority={true} className="object-cover" />
            </div>
            <p className="drop-cap">Jordan Bennet walked through the school corridor, trying very hard not to look nervous.</p>
            <p>It was his first day at a new school.</p>
            <p>He stopped outside the classroom, took a breath, and stepped inside.</p>
            <p>“Ma’am, may I come in?”</p>
            <p>The teacher looked up.</p>
            <p>Jordan glanced around the room, searching for the perfect seat.</p>
            <p>There was only one empty one.</p>
            <p>The last seat.</p>
            <p className="italic">Shit. I wanted the solitary corner. It’s easier to look mysterious when you aren't sharing elbow space.</p>
            <p>Trying to maintain his dignity, Jordan walked toward the back of the classroom and placed his bag on the bench.</p>
          </div>
        ),
      },
      {
        id: "c1-p2",
        content: (
          <div className="book-content text-lg md:text-xl">
            <p>A boy was already sitting beside him.</p>
            <p>Jordan turned.</p>
            <p>“What’s your name?”</p>
            <p>The boy looked at him.</p>
            <p>“My name is Roswaal Vance. I’m from Columbus. What about you?”</p>
            <p>“Jordan. I’m from Sydney. I’m also new here.”</p>
            <p>Roswaal nodded, studying him for a second.</p>
            <p>“Hmm.”</p>
            <p>For a while, they sat quietly.</p>
            <p>Then Roswaal suddenly leaned in and asked,</p>
            <p>“Do you have a crush?”</p>
            <p>Jordan forced his voice flat, leaning back into his chair, trying to project the detached dominance of someone who had everything figured out.</p>
          </div>
        ),
      },
      {
        id: "c1-p3",
        content: (
          <div className="book-content text-lg md:text-xl">
            
            <p>“No. I don’t like anyone. And I don’t like people who waste their time and their lives chasing love. By the way, what about you? Don’t you like anyone?”</p>
            <p>“I also don’t like anyone.”</p>
            <p>They continued talking.</p>
            <p>Neither of them noticed the teacher watching them.</p>
            <p>“Jordan! Roswaal!”</p>
            <p>Both froze.</p>
            <p>“Sorry, ma’am.”</p>
            <p>Jordan lowered his head.</p>
            <p>His first day was already going badly.</p>
            <p className="italic">If I keep messing up like this, I'm never going to pull off the quiet, untouchable persona.</p>
            <p>His thoughts drifted further and further away until he entered a deep daydream.</p>
          </div>
        ),
      },
      {
        id: "c1-p4",
        content: (
          <div className="book-content text-lg md:text-xl">
            <p>Roswaal called his name.</p>
            <p>Nothing.</p>
            <p>Again.</p>
            <p>Nothing.</p>
            <p>Roswaal understood what was happening.</p>
            <p>A terrible idea entered his mind.</p>
            <p>He prepared his legendary supersonic slap.</p>
            <p>And then—</p>
            <p>SMACK.</p>
            <p>Jordan screamed.</p>
            <p>“AHHHHHHH!”</p>
            <p>The entire class burst into laughter.</p>
          </div>
        ),
      },
      {
        id: "c1-p5",
        content: (
          <div className="book-content text-lg md:text-xl">
            
            <p>The teacher&apos;s patience finally disappeared.</p>
            <p>She slapped both boys.</p>
            <p>“You two! Raise your hands. And if you cause any more trouble, you&apos;re going straight to the principal’s office.”</p>
            <p>Jordan became emotional.</p>
            <p>Not because he was sad.</p>
            <p>Because his carefully constructed, unbothered persona had just collapsed in front of a live audience.</p>
            <p>Eventually, recess began.</p>
            <p>Jordan sat alone, eating his lunch.</p>
            <p>Then he noticed something.</p>
            <p>Four girls were surrounding another girl.</p>
            <p>He stood up and walked toward them.</p>
          </div>
        ),
      },
      {
        id: "c1-p6",
        content: (
          <div className="book-content text-lg md:text-xl">
            <p>Then he stopped.</p>
            <p>He knew her.</p>
            <p>Clara Whitmore.</p>
            <p>A girl from his previous school.</p>
            <p>Jordan stared at her.</p>
            <p>His expression slowly changed.</p>
            <p>Roswaal noticed immediately.</p>
            <p>He had never seen Jordan this angry before.</p>
            <p>“Hey, Jordan.”</p>
            <p>Jordan didn&apos;t answer.</p>
            <p>Roswaal looked toward Clara.</p>
            <p>“Do you like her?”</p>
            <p>Jordan remained silent.</p>
          </div>
        ),
      },
      {
        id: "c1-p7",
        content: (
          <div className="book-content text-lg md:text-xl">
            <p>Roswaal understood.</p>
            <p>He immediately ran to a teacher and reported the girls.</p>
            <p>The teacher arrived quickly and punished them.</p>
            <p>Jordan&apos;s anger slowly faded.</p>
            <p>Roswaal turned to him again.</p>
            <p>“Do you love Clara?”</p>
            <p>“No.”</p>
            <p>Jordan looked away.</p>
            <p>“Actually, I hate her.”</p>
            <p>Roswaal raised an eyebrow.</p>
            <p>“You have to swear on your mother.”</p>
            <p>Jordan went silent.</p>
          </div>
        ),
      },
      {
        id: "c1-p8",
        content: (
          <div className="book-content text-lg md:text-xl">
            
            <p>Roswaal smiled.</p>
            <p>“You like her.”</p>
            <p>Jordan gave a quiet laugh.</p>
            <p>“Maybe I do.”</p>
            <p>His smile faded as his eyes drifted toward Clara.</p>
            <p className="my-6 text-xl tracking-wide leading-relaxed">“But at least I found something worth dying for.”</p>
            <p>Roswaal laughed.</p>
            <p>“Bro, she hasn&apos;t even talked to you. She doesn&apos;t even know your name.”</p>
            <p>Jordan didn&apos;t look away from Clara.</p>
            <p>“I don&apos;t need her to talk to me to know how I feel.”</p>
            <p>Afterward, Jordan couldn&apos;t stop thinking about the bullying.</p>
          </div>
        ),
      },
      {
        id: "c1-p9",
        content: (
          <div className="book-content text-lg md:text-xl">
            <p>“Why were those girls bullying her?”</p>
            <p>Roswaal answered,</p>
            <p>“Those four girls are powerful because their fathers are involved in politics. They don&apos;t like anyone who disobeys them.”</p>
            <p>Jordan frowned.</p>
            <p>“How can I help her?”</p>
            <p>Roswaal thought for a moment.</p>
            <p>“You could change the situation around her.”</p>
            <p>“What does that mean?”</p>
            <p>“It means you interfere with what&apos;s happening. But it won&apos;t work forever. There will be days when you aren&apos;t around.”</p>
            <p>Jordan nodded.</p>
          </div>
        ),
      },
      {
        id: "c1-p10",
        content: (
          <div className="book-content text-lg md:text-xl">
            
            <p>“That&apos;ll work for a few days. It gives me time to find something permanent.”</p>
            <p>“I&apos;ll help you.”</p>
            <p>Jordan looked at him.</p>
            <p>“Are you a little shit?”</p>
            <p>Roswaal smirked.</p>
            <p>“No, but I can see your parents already made one.”</p>
            <p>Jordan laughed.</p>
            <p>“Bruh, calm down. It was a joke.”</p>
            <p>Roswaal suddenly looked toward the window.</p>
            <p>“Look! There&apos;s an eagle outside.”</p>
            <p>Jordan turned.</p>
          </div>
        ),
      },
      {
        id: "c1-p11",
        content: (
          <div className="book-content text-lg md:text-xl">
            <p>Roswaal smashed his notebook against his head.</p>
            <p>Jordan stared at him in disbelief.</p>
            <p>Then he grabbed his own notebook.</p>
            <p>Within seconds, the two were fighting with their notebooks like complete idiots.</p>
            <p>Neither noticed the teacher standing directly behind them.</p>
            <p>“Both of you.”</p>
            <p>They froze.</p>
          </div>
        ),
      }
    ],
  },
  {
    id: "chapter-2",
    title: "SITUATIONS",
    romanNumeral: "II",
    mood: "chapter2",
    pages: [
      {
        id: "c2-p1",
        content: (
          <div className="book-content">
            <div className="w-full h-48 sm:h-56 relative mb-6 rounded-sm overflow-hidden shadow-xl border border-[var(--color-border-subtle)]">
              <Image src="/images/desk.jpg" alt="Dark Romance Desk" fill sizes="(max-width: 768px) 100vw, 50vw" priority={true} className="object-cover" />
            </div>
            <p className="drop-cap">Jordan sat with the school diary open in front of him, turning page after page.</p>
            <p>Roswaal watched him for a while.</p>
            <p>“Hey, Jordan. What are you looking for?”</p>
            <p>Jordan didn&apos;t look up.</p>
            <p>“I&apos;m searching for the school&apos;s rules and regulations.”</p>
            <p>“Why?”</p>
            <p>“To find some way to legally protect Clara from those girls and the trouble they&apos;re causing.”</p>
            <p>Roswaal sighed.</p>
            <p>“I&apos;m sad for you.”</p>
            <p>Jordan looked up.</p>
            <p>“Why?”</p>
          </div>
        ),
      },
      {
        id: "c2-p2",
        content: (
          <div className="book-content text-lg md:text-xl">
            <p>“Because you&apos;re carrying so much pain.”</p>
            <p>Jordan stared at him.</p>
            <p>“How? Are you joking?”</p>
            <p>“No. I&apos;m serious. You&apos;re searching for solutions like a drug addict.”</p>
            <p>Jordan shook his head.</p>
            <p>“Oh, bruh. Come on. I&apos;m serious and you&apos;re joking. There&apos;s nothing useful here.”</p>
            <p>Roswaal shrugged.</p>
            <p>“Then you&apos;ll have to figure it out yourself.”</p>
            <p>Jordan closed the diary.</p>
            <p>“I guess I will. Come on. Let&apos;s go outside. It&apos;s lunch time.”</p>
            <p>“Okay.”</p>
          </div>
        ),
      },
      {
        id: "c2-p3",
        content: (
          <div className="book-content text-lg md:text-xl">
            <p>The next day, Jordan arrived at school and noticed Clara walking toward him.</p>
            <p>For a brief moment, he thought she was finally coming to talk to him.</p>
            <p>She walked straight past him.</p>
            <p>Jordan stood still.</p>
            <p>She hadn&apos;t even noticed him.</p>
            <p>Something about that moment stayed with him.</p>
            <p>When he entered the classroom, Roswaal immediately noticed his expression.</p>
            <p>“What happened?”</p>
            <p>Jordan sat down.</p>
            <p>“Nothing.”</p>
            <p>Roswaal didn&apos;t believe him.</p>
          </div>
        ),
      },
      {
        id: "c2-p4",
        content: (
          <div className="book-content text-lg md:text-xl">
            <p>Jordan had barely spoken when he noticed that the four girls were absent.</p>
            <p>For once, Clara was left alone.</p>
            <p>But before leaving school the previous day, the girls had scribbled across Clara&apos;s desk.</p>
            <p>Jordan stared at it.</p>
            <p>After school, he went back to Clara&apos;s classroom.</p>
            <p>He cleaned the desk himself.</p>
            <p>Roswaal watched from the doorway.</p>
            <p>He understood exactly what Jordan was doing.</p>
            <p>Neither of them said anything.</p>
            <p className="text-center text-[var(--color-ink-muted)]">✦</p>
            <p>That evening, Jordan overheard his parents talking.</p>
          </div>
        ),
      },
      {
        id: "c2-p5",
        content: (
          <div className="book-content text-lg md:text-xl">
            
            <p>His father answered the phone.</p>
            <p>His mother spoke first.</p>
            <p>“Do you have any money?”</p>
            <p>“Why do you need money?”</p>
            <p>“There isn&apos;t much food left.”</p>
            <p>His father sighed.</p>
            <p>“Wait. Let me check my account.”</p>
            <p>He checked.</p>
            <p>Only five hundred rupees remained.</p>
            <p>After recent expenses, four hundred had already been spent.</p>
            <p>His mother went quiet.</p>
            <p>“Take care.”</p>
          </div>
        ),
      },
      {
        id: "c2-p6",
        content: (
          <div className="book-content text-lg md:text-xl">
            <p>The call ended.</p>
            <p>Jordan saw the calendar.</p>
            <p>May 11th.</p>
            <p>Twenty days.</p>
            <p>Twenty days on almost nothing.</p>
            <p>He heard enough of the conversation to understand what was happening.</p>
            <p>“Mom?”</p>
            <p>“Yes?”</p>
            <p>“I don&apos;t want to eat.”</p>
            <p>She looked at him.</p>
            <p>“Jordan—”</p>
            <p>But he had already left.</p>
          </div>
        ),
      },
      {
        id: "c2-p7",
        content: (
          <div className="book-content text-lg md:text-xl">
            
            <p>He ran straight to Roswaal&apos;s house and told him everything.</p>
            <p>Roswaal listened quietly.</p>
            <p>Jordan had finally started to understand that Clara wasn&apos;t the only person he was trying to save.</p>
            <p>His own family needed him too.</p>
            <p className="text-center text-[var(--color-ink-muted)]">✦</p>
            <p>The next morning, Jordan woke early.</p>
            <p>For the first time, he didn&apos;t think about looking cool.</p>
            <p>He thought about responsibility.</p>
            <p>And he knew he couldn&apos;t avoid it anymore.</p>
          </div>
        ),
      }
    ],
  },
  {
    id: "chapter-3",
    title: "MANAGEMENT",
    romanNumeral: "III",
    mood: "chapter3",
    pages: [
      {
        id: "c3-p1",
        content: (
          <div className="book-content text-lg md:text-xl">
            <p className="drop-cap">Jordan sat with Roswaal late into the evening.</p>
            <p>Neither of them was joking.</p>
            <p>Jordan looked exhausted.</p>
            <p>“What can I do to improve my family&apos;s situation?”</p>
            <p>Roswaal thought for a moment.</p>
            <p>“What skills do you have?”</p>
            <p>Jordan hesitated.</p>
            <p>“Honestly?”</p>
            <p>“Yeah.”</p>
            <p>“I don&apos;t have any.”</p>
            <p>Roswaal leaned back.</p>
            <p>“You might not have skills yet.”</p>
          </div>
        ),
      },
      {
        id: "c3-p2",
        content: (
          <div className="book-content text-lg md:text-xl">
            <p>Jordan looked at him.</p>
            <p>“But I have an idea.”</p>
            <p>“Tell me.”</p>
            <p>“You can work at my father&apos;s office.”</p>
            <p>Jordan blinked.</p>
            <p>“For what?”</p>
            <p>“Two or three hours a day. After school.”</p>
            <p>“Really?”</p>
            <p>“Yeah. I&apos;ve worked there before.”</p>
            <p>“What kind of work?”</p>
            <p>“Supplying ice bags to boxing gyms.”</p>
            <p>Jordan stared at him.</p>
          </div>
        ),
      },
      {
        id: "c3-p3",
        content: (
          <div className="book-content text-lg md:text-xl">
            
            <p>“Boxing gyms?”</p>
            <p>Roswaal nodded.</p>
            <p>“What does your father do?”</p>
            <p>“He owns the boxing gym.”</p>
            <p>Jordan frowned.</p>
            <p>“But you told me your father has a company.”</p>
            <p>Roswaal shrugged.</p>
            <p>“Business doesn&apos;t stop at one business.”</p>
            <p>Jordan thought about it.</p>
            <p>“How much would I earn?”</p>
            <p>“Around two to three thousand rupees a month.”</p>
            <p>Jordan nodded slowly.</p>
          </div>
        ),
      },
      {
        id: "c3-p4",
        content: (
          <div className="book-content text-lg md:text-xl">
            <p>“That could work.”</p>
            <p className="text-center text-[var(--color-ink-muted)]">✦</p>
            <p>The next morning, Jordan got ready for school.</p>
            <p>He packed his bag and headed out.</p>
            <p>When he reached the school, the first thing he did was look for Clara.</p>
            <p>She was there.</p>
            <p>Jordan felt a strange sense of relief.</p>
            <p>He didn&apos;t understand why seeing her had become so important to him.</p>
            <p>He entered his classroom.</p>
            <p>Something felt different.</p>
          </div>
        ),
      },
      {
        id: "c3-p5",
        content: (
          <div className="book-content text-lg md:text-xl">
            <p>Everyone seemed to be talking about someone.</p>
            <p>A new student.</p>
            <p>Jordan looked around.</p>
            <p>Roswaal walked over.</p>
            <p>“Hey, Jordan.”</p>
            <p>“Yo, bro. Did you ask your father?”</p>
            <p>“Yeah. He said he&apos;d give you 3,500 rupees per month.”</p>
            <p>Jordan smiled.</p>
            <p>“That works for me.”</p>
            <p>Roswaal nodded.</p>
            <p>“Also, I found out something about the new student.”</p>
            <p>Jordan looked at him.</p>
          </div>
        ),
      },
      {
        id: "c3-p6",
        content: (
          <div className="book-content text-lg md:text-xl">
            <p>“What?”</p>
            <p>“His name is Tony.”</p>
            <p>“Tony?”</p>
            <p>“Yeah.”</p>
            <p>Jordan glanced toward the hallway.</p>
            <p>The new student was standing there.</p>
            <p>Quiet.</p>
            <p>Calm.</p>
            <p>And strangely confident.</p>
            <p>Jordan watched him for a few seconds.</p>
            <p>There was something different about him.</p>
          </div>
        ),
      },
      {
        id: "c3-p7",
        content: (
          <div className="book-content">
            <p className="text-center text-[var(--color-ink-muted)]">✦</p>
            <div className="w-full h-48 sm:h-56 relative my-6 rounded-sm overflow-hidden shadow-xl border border-[var(--color-border-subtle)]">
              <Image src="/images/boxing.jpg" alt="Dark Boxing Gym" fill sizes="(max-width: 768px) 100vw, 50vw" priority={true} className="object-cover" />
            </div>
            <p>After school, Jordan went to the boxing gym.</p>
            <p>The coach was there.</p>
            <p>So was Tony.</p>
            <p>Jordan noticed him immediately.</p>
            <p>Tony was training alone.</p>
            <p>His punches were clean.</p>
            <p>His movement was controlled.</p>
            <p>He didn&apos;t look like someone who had just started boxing.</p>
            <p>The coach noticed Jordan watching.</p>
            <p>“Jordan.”</p>
            <p>“Yeah, coach?”</p>
            <p>“Come here.”</p>
          </div>
        ),
      },
      {
        id: "c3-p8",
        content: (
          <div className="book-content text-lg md:text-xl">
            <p>Jordan walked over.</p>
            <p>“I want you to help Tony.”</p>
            <p>Jordan looked toward him.</p>
            <p>“Okay.”</p>
            <p>He walked over to Tony.</p>
            <p>“Hey.”</p>
            <p>Tony turned.</p>
            <p>“Yeah?”</p>
            <p>“I&apos;m Jordan.”</p>
            <p>“I know.”</p>
            <p>Jordan paused.</p>
            <p>“You&apos;ve boxed before?”</p>
          </div>
        ),
      },
      {
        id: "c3-p9",
        content: (
          <div className="book-content text-lg md:text-xl">
            <p>Tony continued wrapping his hands.</p>
            <p className="my-6 text-xl tracking-wide leading-relaxed">“Five years.”</p>
            <p>Jordan raised an eyebrow.</p>
            <p>“Five years?”</p>
            <p>Tony nodded.</p>
            <p>“Started when I was ten.”</p>
            <p>Jordan looked toward the ring.</p>
            <p>“Then I guess you don&apos;t need much from me.”</p>
            <p>Tony stepped into the ring.</p>
            <p>“Maybe.”</p>
            <p>Jordan smiled.</p>
            <p>“We&apos;ll see.”</p>
          </div>
        ),
      },
      {
        id: "c3-p10",
        content: (
          <div className="book-content text-lg md:text-xl">
            <p className="text-center text-[var(--color-ink-muted)]">✦</p>
            
            <p>Later, Jordan went to his father&apos;s office.</p>
            <p>The work was simple.</p>
            <p>Delivering supplies.</p>
            <p>Managing orders.</p>
            <p>Carrying ice bags.</p>
            <p>Handling whatever needed to be handled.</p>
            <p>It wasn&apos;t glamorous.</p>
            <p>It wasn&apos;t easy.</p>
            <p>But Jordan didn&apos;t complain.</p>
            <p>He kept coming back.</p>
            <p>Day after day.</p>
          </div>
        ),
      },
      {
        id: "c3-p11",
        content: (
          <div className="book-content text-lg md:text-xl">
            <p>Slowly, he began understanding how everything worked.</p>
            <p>Orders.</p>
            <p>Customers.</p>
            <p>Money.</p>
            <p>People.</p>
            <p>Responsibility.</p>
            <p>The work was tiring, but there was something strangely satisfying about knowing that he was contributing to his family.</p>
            <p>One evening, his father stopped him.</p>
            <p>“You&apos;re learning quickly.”</p>
            <p>Jordan shrugged.</p>
            <p>“I just don&apos;t want to be useless.”</p>
            <p>His father looked at him.</p>
          </div>
        ),
      },
      {
        id: "c3-p12",
        content: (
          <div className="book-content text-lg md:text-xl">
            <p>“You&apos;re not.”</p>
            <p>Jordan said nothing.</p>
            <p>But he remembered those words.</p>
            <p className="text-center text-[var(--color-ink-muted)]">✦</p>
            <p>That night, Jordan returned home.</p>
            <p>His mother was waiting.</p>
            <p>“Jordan, where were you?”</p>
            <p>“Working.”</p>
            <p>She looked surprised.</p>
            <p>“You started already?”</p>
            <p>“Yeah.”</p>
            <p>She smiled.</p>
            <p>“Your favorite dinner is ready.”</p>
          </div>
        ),
      },
      {
        id: "c3-p13",
        content: (
          <div className="book-content text-lg md:text-xl">
            <p>Jordan sat down.</p>
            <p>Then he asked,</p>
            <p>“How much did it cost?”</p>
            <p>His mother frowned.</p>
            <p>“Why are you asking that? Just eat.”</p>
            <p>“But—”</p>
            <p>“We have enough this month.”</p>
            <p>Jordan looked at the food.</p>
            <p>His mother smiled.</p>
            <p>“Eat.”</p>
            <p>Jordan finally did.</p>
          </div>
        ),
      },
      {
        id: "c3-p14",
        content: (
          <div className="book-content text-lg md:text-xl">
            
            <p>Later that night, he went to the roof.</p>
            <p>The city stretched quietly beneath him.</p>
            <p>For a long time, he said nothing.</p>
            <p>Then he cried.</p>
            <p>Not because he was weak.</p>
            <p>Because he had finally understood how much his family had been hiding from him.</p>
            <p>He wiped his face.</p>
            <p className="my-6 text-xl tracking-wide leading-relaxed">“I&apos;ll fix this.”</p>
            <p className="text-center text-[var(--color-ink-muted)]">✦</p>
            <p>The next morning, Jordan woke before his alarm.</p>
          </div>
        ),
      },
      {
        id: "c3-p15",
        content: (
          <div className="book-content text-lg md:text-xl">
            <p>He went to school.</p>
            <p>Then to work.</p>
            <p>Then to the boxing gym.</p>
            <p className="my-6 text-xl tracking-wide leading-relaxed">Three different worlds. One life.</p>
            <p>And somehow, he had to keep all three together.</p>
            <p>At the boxing gym, Tony was training again.</p>
            <p>Jordan watched him.</p>
            <p>Tony was improving.</p>
            <p>Fast.</p>
            <p>Jordan walked toward him.</p>
            <p>“Tony.”</p>
            <p>Tony turned.</p>
            <p>“Yeah?”</p>
          </div>
        ),
      },
      {
        id: "c3-p16",
        content: (
          <div className="book-content text-lg md:text-xl">
            <p>“I heard you&apos;ve been boxing for five years.”</p>
            <p>“Yeah.”</p>
            <p>Jordan smiled.</p>
            <p>“Then let&apos;s see what you&apos;ve got.”</p>
            <p>Tony stepped forward.</p>
            <p>The two entered the ring.</p>
            <p>Neither of them knew it yet, but Tony&apos;s arrival was about to change Jordan&apos;s life in ways that had nothing to do with boxing.</p>
          </div>
        ),
      }
    ],
  },
];
