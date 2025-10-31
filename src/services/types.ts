export enum Difficulty {
    Beginner = 'Beginner',
    Intermediate = 'Intermediate',
    Advanced = 'Advanced',
}

export interface MediaFormat {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    width: number;
    height: number;
    size: number;
    path: string;
    url: string;
}

export interface Media {
    id: number;
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    formats: { thumbnail: MediaFormat; small: MediaFormat; medium: MediaFormat; large: MediaFormat; };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string;
    provider: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Exercise {
    id: number;
    createdAt: Date; updatedAt: Date; publishedAt?: Date; name: string;
    description?: string;
    difficulty?: Difficulty;
    image?: Media;
    videoUrl?: string;
    isActive?: boolean;
}

export interface Workout {
    id: number;
    createdAt: Date; updatedAt: Date; publishedAt?: Date; userId: string;
    date: Date;
    duration: number;
    exercises?: any;

}