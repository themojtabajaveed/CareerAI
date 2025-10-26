import { Phase, Status } from './types';

export const INITIAL_PHASES: Phase[] = [
  {
    id: 1,
    title: 'Introspection',
    description: 'Discover your passions, strengths, and career goals to build a foundation for your journey.',
    unlocked: true,
    actionItems: [
      { 
        id: 'ikigai', 
        title: 'Guided Ikigai Journaling', 
        subSteps: [
          { 
            id: 'ikigai-ai', 
            title: 'Complete AI-guided reflection', 
            status: Status.NotStarted, 
            type: 'ai',
            questions: [
              "What do you love to do? Think about activities, topics, or hobbies that make you feel alive and engaged.",
              "What are you good at? List your skills, talents, and strengths, both personal and professional.",
              "What does the world need? Consider problems you'd like to solve or ways you'd like to contribute to your community or society.",
              "What can you be paid for? Think about services, skills, or knowledge that have market value."
            ],
            details: '',
          }
        ] 
      },
      { 
        id: 'research-roles', 
        title: 'Research Industry/Role Aligns with Your Ikigai', 
        subSteps: [
          { id: 'research-1', title: 'Identify 3-5 potential roles based on Ikigai analysis', status: Status.NotStarted, type: 'manual', details: '' },
          { id: 'research-2', title: 'Research salary, skills, and growth for top 2 roles', status: Status.NotStarted, type: 'manual', details: '' },
          { id: 'research-3', title: 'Summarize findings and select primary target role', status: Status.NotStarted, type: 'manual', details: '' },
        ]
      },
      { 
        id: 'outreach', 
        title: 'Personalized Outreach to Connect with Recruiters/Founders', 
        subSteps: [
          { id: 'outreach-1', title: 'Identify 10 people in your target role/industry on LinkedIn', status: Status.NotStarted, type: 'manual', details: '' },
          { id: 'outreach-2', title: 'Draft a personalized connection request template', status: Status.NotStarted, type: 'manual', details: '' },
          { id: 'outreach-3', title: 'Send 5 connection requests', status: Status.NotStarted, type: 'manual', details: '' },
        ]
      },
    ],
  },
  {
    id: 2,
    title: 'Exploration',
    description: 'Dive deep into project ideas, build your skills, and share your progress with the world.',
    unlocked: false,
    actionItems: [
      { 
        id: 'research-projects', 
        title: 'Research Project Topics Aligned with Target Firms', 
        subSteps: [
            { id: 'rp-1', title: 'List 5 companies you admire', status: Status.NotStarted, type: 'manual', details: '' },
            { id: 'rp-2', title: 'Brainstorm 3 project ideas that align with their work', status: Status.NotStarted, type: 'manual', details: '' },
        ]
      },
      { 
        id: 'bip-generator', 
        title: 'Daily Build-in-Public Post Generator', 
        subSteps: [
            { id: 'bip-1', title: 'Generate social media posts for your project', status: Status.NotStarted, type: 'ai', questions: ["Briefly describe your project update, a challenge you overcame, or something new you learned today."], details: '' }
        ]
      },
    ],
  },
  {
    id: 3,
    title: 'Reflection',
    description: 'Gather feedback, analyze your performance, and turn your experiences into powerful stories.',
    unlocked: false,
    actionItems: [
      { id: 'feedback-funnel', title: 'Peer/Mentor Feedback Funnel', subSteps: [
        { id: 'ff-1', title: 'Identify 3 people to ask for feedback', status: Status.NotStarted, type: 'manual', details: '' },
        { id: 'ff-2', title: 'Request feedback on a recent project or interaction', status: Status.NotStarted, type: 'manual', details: '' },
      ]},
      { 
        id: 'sw-analyzer', 
        title: 'Strength-Weakness Analyzer', 
        subSteps: [
            { id: 'swa-1', title: 'Analyze feedback with AI', status: Status.NotStarted, type: 'ai', questions: ["Paste in the feedback you have received from peers or mentors, ensuring it's anonymous if needed."], details: '' }
        ]
      },
      { id: 'case-study-generator', title: 'Case-study Generator', subSteps: [
        { id: 'csg-1', title: 'Outline a project for a case study (Problem, Action, Result)', status: Status.NotStarted, type: 'manual', details: '' },
      ]},
    ],
  },
  {
    id: 4,
    title: 'Action',
    description: 'Execute on your projects, optimize your process, and actively pursue job opportunities.',
    unlocked: false,
    actionItems: [
      { id: 'milestone-tracker', title: 'Project Milestone Tracker', subSteps: [
        { id: 'pmt-1', title: 'Break down your main project into 5 smaller milestones', status: Status.NotStarted, type: 'manual', details: '' },
        { id: 'pmt-2', title: 'Assign deadlines to each milestone', status: Status.NotStarted, type: 'manual', details: '' },
      ]},
      { 
        id: 'delta-4', 
        title: 'Delta 4 Prompt to Identify Friction & Delight Points', 
        subSteps: [
            { id: 'd4-1', title: 'Analyze a recent experience with AI', status: Status.NotStarted, type: 'ai', questions: ["Describe a recent project milestone, a user interaction, or a challenging experience you navigated."], details: '' }
        ]
      },
      { id: 'alerts', title: 'Alerts from Target Firms', subSteps: [
         { id: 'a-1', title: 'Set up job alerts for your target role on 3 platforms', status: Status.NotStarted, type: 'manual', details: '' },
      ]},
    ],
  },
];