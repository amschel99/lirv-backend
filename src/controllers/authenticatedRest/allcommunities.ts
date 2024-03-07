import { majorCareers } from "../../utils/communities_data";
import { Request, Response } from "express";

import Community from "../../models/community";

export const majorCommunities: {
  title: string;
  description: string;
  tags: string[];
  createdAt: Date;
}[] = [];

majorCareers.forEach((career) => {
  majorCommunities.push({
    title: career,
    description: `Welcome to the ${career} Community! This community is dedicated to ${career} lovers!`,

    tags: [`${career}`],
    createdAt: new Date(),
  });
});
export const createAllCommunities = async (req: Request, res: Response) => {
  try {
    for (const community of majorCommunities) {
      try {
        await Community.create(community);
      } catch (e) {
        console.error("Error creating community:", e);
        return res.status(500).json(`Could not create communities!`);
      }
    }
    return res.status(201).json(`Created all communities`);
  } catch (e) {
    console.error("Error creating communities:", e);
    return res.status(500).json(`Could not create communities!`);
  }
};
