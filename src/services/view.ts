import { prisma } from "@/server/lib/prisma";
import { Post } from "@/services/post";
import { User } from "@/services/user";

export type Viewer =
  | {
      type: "user";
      id: User["id"];
    }
  | {
      type: "guest";
      ipAddress: string;
    };

export const view = async (body: { postId: Post["id"]; viewer: Viewer }) => {
  const existingView = await prisma.view.findFirst({
    where: {
      postId: body.postId,
      userId: body.viewer.type === "user" ? body.viewer.id : undefined,
      ipAddress: body.viewer.type === "guest" ? body.viewer.ipAddress : undefined,
    },
  });

  if (existingView) {
    return;
  }

  await prisma.view.create({
    data: {
      postId: body.postId,
      userId: body.viewer.type === "user" ? body.viewer.id : undefined,
      ipAddress: body.viewer.type === "guest" ? body.viewer.ipAddress : undefined,
    },
  });
};
