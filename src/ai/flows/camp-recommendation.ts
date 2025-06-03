// src/ai/flows/camp-recommendation.ts
'use server';

/**
 * @fileOverview AI-powered camp session recommendation flow based on user preferences.
 *
 * - getCampRecommendations - A function that returns personalized camp recommendations.
 * - CampRecommendationInput - The input type for the getCampRecommendations function.
 * - CampRecommendationOutput - The return type for the getCampRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CampRecommendationInputSchema = z.object({
  searchHistory: z
    .string()
    .describe(
      'A comma separated list of past search queries related to summer camps.'
    ),
  preferences: z
    .string()
    .describe(
      'A comma separated list of preferences for summer camps, such as theme, age, gender, and session length.'
    ),
});
export type CampRecommendationInput = z.infer<typeof CampRecommendationInputSchema>;

const CampRecommendationOutputSchema = z.object({
  recommendations: z
    .string()
    .describe(
      'A comma separated list of recommended camp session ids to display to the user.'
    ),
});
export type CampRecommendationOutput = z.infer<typeof CampRecommendationOutputSchema>;

export async function getCampRecommendations(input: CampRecommendationInput): Promise<CampRecommendationOutput> {
  return campRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'campRecommendationPrompt',
  input: {schema: CampRecommendationInputSchema},
  output: {schema: CampRecommendationOutputSchema},
  prompt: `You are a summer camp recommendation expert.

  Based on the user's past search history and preferences, provide a list of recommended camp session ids to display to the user.
  The camp session ids MUST be comma separated, nothing else.

  Search History: {{{searchHistory}}}
  Preferences: {{{preferences}}}

  Recommendations:`,
});

const campRecommendationFlow = ai.defineFlow(
  {
    name: 'campRecommendationFlow',
    inputSchema: CampRecommendationInputSchema,
    outputSchema: CampRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
