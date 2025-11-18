import Markdown from "react-markdown";

export default function ClaudeRecipe(props) {
  return (
    <section>
      <Markdown>{props.response}</Markdown>
    </section>
  );
}
