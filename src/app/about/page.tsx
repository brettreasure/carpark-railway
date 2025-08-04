import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Not bad for a carpark',
  description: 'About the book and author Bret Treasure - a quirky, open-hearted look at crazy, materialistic Western Society',
};

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-blue-gray/5 to-orange/10">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border-l-8 border-orange">
          <h1 className="text-4xl md:text-5xl font-bold text-dark-green mb-8 text-center">
            About the Book
          </h1>
          
          <div className="prose prose-lg max-w-none text-foreground space-y-6">
            <p className="text-xl leading-relaxed">
              The world of rude receptionists, hidden gems, amazing service, horrible experiences… and PARKING THAT&apos;S A NIGHTMARE.
            </p>
            
            <p>
              A burst-out-laughing commentary on the ridiculous, inane, entitled, hysterical, righteous, cruel, incoherent, indignant opinions that people launch at the Internet before they&apos;ve had a chance to cool down a little.
            </p>
            
            <p>
              You&apos;ll encounter the Dinosaur Park with one dinosaur, the screaming match in the brothel, the alley of wet cabbages and the Old Big Man with Severe Mental Issue. And the Old Cow on the Tobacco Counter. And the spirit medium who puts you in touch with your dead dog (5 stars).
            </p>
            
            <p>
              A quirky, open-hearted look at crazy, materialistic, Western Society, and the minestrone of contemporary language. The modern Australian sense of humour on show.
            </p>
            
            <p className="font-semibold text-orange">
              Join FlibbyFlobby, Pants Magee, Bombshell Tans and GorillaWithAGun, as they swing from temper tantrum to &apos;I&apos;m Not Worthy&apos; adoration.
            </p>
            
            <p className="text-center text-lg font-medium italic text-dark-green">
              Seriously, I can&apos;t believe they said that.
            </p>
          </div>
          
          <div className="mt-12 bg-orange/10 rounded-2xl p-8 border-l-4 border-orange">
            <h2 className="text-2xl font-bold text-dark-green mb-4">About Bret Treasure</h2>
            <p className="text-lg text-foreground">
              Right handed, average height. Good with words.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}