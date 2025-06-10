import React from 'react';

const SuccessStories = () => {
  const stories = [
    {
      title: 'Aarav – Coding His Future',
      content: 'Aarav, a computer science student, landed a remote internship through the platform at a SaaS startup. Initially assigned bug fixes, his enthusiasm led him to lead a microservice upgrade. His work impressed the CTO, who offered him a pre-placement offer. Today, Aarav is a full-stack developer at the same company, mentoring new interns and working on enterprise-grade features. He credits the platform for giving him a chance to prove his skills without prior experience.',
      image: '/images/rating1.png',
    },
    {
      title: 'Meena – Designing Beyond the Classroom',
      content: 'Meena, a second-year design student, found an internship at a boutique branding agency. She worked on real client projects, including a full logo and brand kit redesign for a cafe chain. Her work was featured in the agency’s portfolio, which helped her get freelance clients through LinkedIn. She’s now confident in her creative skills and has launched her own design blog. The platform helped her move from classroom concepts to client-facing confidence.',
      image: '/images/rating2.png',
    },
    {
      title: 'Rakesh – Automating Success',
      content: 'Rakesh, a data science enthusiast, joined a supply chain company through the platform. Tasked with optimizing Excel reports, he introduced a Python-based solution that cut report generation time by 75%. His manager recognized his initiative and offered him a part-time role. This hands-on exposure became the core of his college thesis and helped him land a scholarship for higher studies. The internship shaped his career focus and strengthened his resume.',
      image: '/images/rating1.png',
    },
    {
      title: 'Tanya – HR With a Human Touch',
      content: 'Tanya was unsure about her career path until she interned with a mid-sized company’s HR team. She managed recruitment drives and learned about employee engagement firsthand. Her emotional intelligence helped candidates feel comfortable, and she personally handled over 50 candidate interviews. Tanya now works full-time in HR and is preparing for a Master’s in Organizational Psychology. The platform gave her direction and a genuine career passion.',
      image: '/images/rating2.png',
    },
    {
      title: 'Arjun – Pitching With Purpose',
      content: 'Arjun, a BBA student, found a business development internship through the platform. He was initially nervous about sales, but with mentorship, he closed two major deals. His confidence skyrocketed, and he developed a knack for relationship-building. Today, he’s a business analyst in a multinational company, using the same pitch skills that began with his internship. The opportunity transformed him from hesitant student to confident professional.',
      image: '/images/rating1.png',
    },
    {
      title: 'Sana – Breaking Barriers',
      content: 'Sana, from a small town, struggled to find relevant internships—until she discovered this platform. She secured a content internship with an ed-tech company. Her article on inclusive learning received thousands of views and was shared by industry leaders. That visibility led to another internship and a recommendation letter that helped her secure a scholarship abroad. She now dreams of becoming an education reformist.',
      image: '/images/rating2.png',
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">Success Stories</h1>

      {/* <div className='w-full flex justify-center mb-5 m'>
        <img src="/images/whychoose.png" alt="" />
      </div> */}


      <div className="space-y-8">
        {stories.map((story, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center gap-6 bg-gray-100 p-6 rounded-lg shadow-md"
          >
            {/* Left: Image */}
            <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Right: Content */}
            <div className="text-center md:text-left">
              <h2 className="font-semibold text-2xl mb-3">{story.title}</h2>
              <p className="text-gray-600">{story.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuccessStories;