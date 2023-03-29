import fs from "fs";
import matter from "gray-matter";
import path from "path";
import yaml from "js-yaml";

const sectionsDirectory = path.join(process.cwd(), "content/home");

export function fetchHomeSections() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(sectionsDirectory);
  const allSectionsData = fileNames
    .filter((it) => it.endsWith(".mdx"))
    .map((fileName) => {
      // Read markdown file as string
      const fullPath = path.join(sectionsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents, {
        engines: {
          yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
        },
      });
      const matterData = matterResult.data as {
        title: string;
      };

      return matterResult.data;
    });

  return allSectionsData;
}
