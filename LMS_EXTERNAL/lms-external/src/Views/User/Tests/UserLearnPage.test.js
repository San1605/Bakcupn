// UserLearnPage.test.js

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter  } from 'react-router-dom';
import { GlobalProvider } from '../../../Context/GlobalContext';
import UserLearnPage from './UserLearnPage';

// Mock the necessary context values and functions
const mockEnrolledCourseInfo = {
    topics: [
        {
            topicName: 'Topic 1',
            isLocked: false,
            topicData: [
                {
                    ID: 'topic1-subtopic1-id',
                    subtopic: 'Subtopic 1',
                    contentType: 'Video',
                    link1: 'https://example.com/video1.mp4',
                    completed: false,
                },
                {
                    ID: 'topic1-subtopic2-id',
                    subtopic: 'Subtopic 2',
                    contentType: 'Reading',
                    link1: 'https://example.com/reading1.pdf',
                    completed: true,
                },
            ],
        },
        {
            topicName: 'Topic 2',
            isLocked: true,
            topicData: [
                {
                    ID: 'topic2-subtopic1-id',
                    subtopic: 'Subtopic 1',
                    contentType: 'Video',
                    link1: 'https://example.com/video2.mp4',
                    completed: false,
                },
            ],
        },
    ],
};

const mockGetMyCurrentCourse = jest.fn(() => Promise.resolve({}));
const mockMarkAsComplete = jest.fn(() => Promise.resolve({}));

// jest.mock('../../../../Context/GlobalContext', () => ({
//     ...jest.requireActual('../../../../Context/GlobalContext'),
//     GlobalProvider: ({ children }) => (
//         <div data-testid="GlobalProvider">{children}</div>
//     ),
// }));
  
describe('UserLearnPage Component', () => {


    it('renders without crashing', () => {
        render(
            <BrowserRouter>
                <GlobalProvider
                    value={{
                        enrolledCourseInfo: mockEnrolledCourseInfo,
                        dispatch: jest.fn(),
                        markAsComplete: mockMarkAsComplete,
                        getMyCurrentCourse: mockGetMyCurrentCourse,
                    }}
                >
                    <UserLearnPage />
                </GlobalProvider>
            </BrowserRouter>
        );
        expect(screen.getByTestId('userLearnPage')).toBeInTheDocument();
    });

    it('displays loader when loading', () => {
        render(
            <BrowserRouter>
                <GlobalProvider
                    value={{
                        enrolledCourseInfo: mockEnrolledCourseInfo,
                        dispatch: jest.fn(),
                        markAsComplete: mockMarkAsComplete,
                        getMyCurrentCourse: mockGetMyCurrentCourse,
                    }}
                >
                    <UserLearnPage />
                </GlobalProvider>
            </BrowserRouter>
        );
        expect(screen.getByTestId('loader')).toBeInTheDocument();
    });

    it('displays content after loading', async () => {
        // Mock the loading state to be completed
        render(
            <BrowserRouter>
                <GlobalProvider
                    value={{
                        enrolledCourseInfo: mockEnrolledCourseInfo,
                        dispatch: jest.fn(),
                        markAsComplete: mockMarkAsComplete,
                        getMyCurrentCourse: mockGetMyCurrentCourse,
                    }}
                >
                    <UserLearnPage />
                </GlobalProvider>
            </BrowserRouter>
        );
        mockGetMyCurrentCourse.mockResolvedValueOnce({
            topics: [{ topicData: [{ link1: 'test-link', contentType: 'Video', subtopic: 'Test Subtopic' }] }],
        });
        await waitFor(() => expect(screen.queryByTestId('loader')).toBeNull());
        expect(screen.getByTestId('content')).toBeInTheDocument();
    });

    it('handles click on content element', async () => {
        // Mock the loading state to be completed
        render(
            <BrowserRouter>
                <GlobalProvider
                    value={{
                        enrolledCourseInfo: mockEnrolledCourseInfo,
                        dispatch: jest.fn(),
                        markAsComplete: mockMarkAsComplete,
                        getMyCurrentCourse: mockGetMyCurrentCourse,
                    }}
                >
                    <UserLearnPage />
                </GlobalProvider>
            </BrowserRouter>
        );
        mockGetMyCurrentCourse.mockResolvedValueOnce({
            topics: [{ topicData: [{ link1: 'test-link', contentType: 'Video', subtopic: 'Test Subtopic' }] }],
        });

        await waitFor(() => expect(screen.queryByTestId('loader')).toBeNull());

        const contentElement = screen.getByTestId('contentElement');
        fireEvent.click(contentElement);

        // Add assertions for the expected behavior
        expect(screen.getByTestId('videoPlayer')).toBeInTheDocument();
    });

    it('handles click on "Mark as Complete"', async () => {
        // Mock the loading state to be completed
        render(
            <BrowserRouter>
                <GlobalProvider
                    value={{
                        enrolledCourseInfo: mockEnrolledCourseInfo,
                        dispatch: jest.fn(),
                        markAsComplete: mockMarkAsComplete,
                        getMyCurrentCourse: mockGetMyCurrentCourse,
                    }}
                >
                    <UserLearnPage />
                </GlobalProvider>
            </BrowserRouter>
        );
        mockGetMyCurrentCourse.mockResolvedValueOnce({
            topics: [{ topicData: [{ link1: 'test-link', contentType: 'Video', subtopic: 'Test Subtopic' }] }],
        });

        await waitFor(() => expect(screen.queryByTestId('loader')).toBeNull());

        const markAsCompleteButton = screen.getByTestId('markAsCompleteButton');
        fireEvent.click(markAsCompleteButton);

        // Add assertions for the expected behavior
        expect(mockMarkAsComplete).toHaveBeenCalledWith('test-course-id', 'test-subtopic-id');
    });
});