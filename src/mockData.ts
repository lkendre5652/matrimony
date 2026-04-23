import { UserProfile } from './types';

export const MOCK_PROFILE: UserProfile = {
  id: '1',
  name: 'Priya Sharma',
  age: 26,
  gender: 'female',
  height: "5'4\"",
  location: 'Mumbai, India',
  profession: 'Senior Software Engineer',
  education: 'B.Tech in Computer Science',
  religion: 'Hindu',
  caste: 'Brahmin',
  motherTongue: 'Hindi',
  bio: 'A technology enthusiast who loves traveling and exploring new cuisines. I value family traditions while maintaining a modern outlook on life. Looking for someone who is career-oriented yet family-focused.',
  photos: [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500&auto=format&fit=crop',
  ],
  familyDetails: {
    fatherProfession: 'Retired Bank Manager',
    motherProfession: 'Homemaker',
    siblings: 1,
    familyValues: 'Moderate',
  },
  expectations: 'Looking for a kind-hearted, professional individual with similar cultural values and a zest for life.'
};
