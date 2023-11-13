const js = () => {
  const init = () => {
    const node = document.createElement("script");

    node.id = "jivo-chat-sales";
    node.async = true;
    node.src = "//code.jivosite.com/script/widget/cXV8aNrME3";

    document.head.appendChild(node);
  };

  addEventListener(
    "load",
    () =>
      typeof requestIdleCallback !== "undefined"
        ? requestIdleCallback(() => setTimeout(init, 5_500))
        : init(),
  );
};

function JivoChat() {
  return (
    <>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js" />
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{ __html: `(${js})()` }}
      />
    </>
  );
}

export default JivoChat;
