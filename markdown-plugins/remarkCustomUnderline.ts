import type { Root } from "@nuxtjs/mdc";
import { visit } from "unist-util-visit";

// THIS IS A TEST FOR A CUSTOM PLUGIN
// PLUGIN ARE ONLY USEFUL FOR REPLACING MDAST NODES WITH OTHER NODES
// IF YOU WANT TO REPLACE THE WAY CERTAIN MD TAGS ARE INTEREPRETED; YOU NEED TO DIRECTLY MANIPULATE THE SOURCE TEXT


/**
 * @import {Root} from 'mdast'
 */

/**
 * Turn __underscore__ wrappers (`__word__`) into underlined html (`<u>word</u>`).
 *
 * @returns
 *   Transform.
 */
export default function remarkCustomUnderline() {
  // Return a function that will be applied to the markdown syntax tree
  return (tree: Root) => {
    return


    console.log("tree", tree);
    // Traverse the tree and look for nodes that contain text
    visit(tree, "text", (node) => {
      // Regex to match the pattern of double underscores around a word
      console.log("node", node);
      const regex = /__(.*?)__/g;

      // Replace matched patterns in node's value with <u> HTML tags
      // match: the entire match (e.g., "__word__")
      // word: the captured group (e.g., "word")
      let newValue = node.value.replace(
        regex,
        (match, word) => `<u>${word}</u>`
      );

      // Update the node's value with the new string where desired patterns are replaced
      node.value = newValue;
    });
  };
}
