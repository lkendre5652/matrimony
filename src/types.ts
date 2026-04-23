/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  height: string;
  location: string;
  profession: string;
  education: string;
  religion: string;
  caste: string;
  motherTongue: string;
  bio: string;
  photos: string[];
  familyDetails: {
    fatherProfession: string;
    motherProfession: string;
    siblings: number;
    familyValues: string;
  };
  expectations: string;
  isShortlisted?: boolean;
  isHidden?: boolean;
  viewedAt?: string;
}

export interface Proposal {
  id: string;
  senderId: string;
  receiverId: string;
  status: 'pending' | 'accepted' | 'declined';
  message?: string;
  timestamp: string;
}
