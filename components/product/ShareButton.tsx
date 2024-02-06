import Icon from "$store/components/ui/Icon.tsx";

function windowOpen(url: string, width = 650, height = 450) {
  const left = globalThis.window.outerWidth / 2 +
    (globalThis.window.screenX || globalThis.window.screenLeft || 0) -
    width / 2;
  const top = globalThis.window.outerHeight / 2 +
    (globalThis.window.screenY || globalThis.window.screenTop || 0) -
    height / 2;

  const config = {
    height,
    width,
    left,
    top,
    location: "no",
    toolbar: "no",
    status: "no",
    directories: "no",
    menubar: "no",
    scrollbars: "yes",
    resizable: "no",
    centerscreen: "yes",
    chrome: "yes",
  };

  const shareDialog = globalThis.window.open(
    url,
    "share",
    Object.keys(config)
      .map((key) => `${key}=${config[key as keyof typeof config]}`)
      .join(","),
  );

  return shareDialog;
}

interface Props {
  network: string;
  link: string;
}

function ShareButton({ network, link }: Props) {
  const openShareWindow = (urlLink: string) => windowOpen(urlLink);
  const onClick = (ev: Event) => {
    ev.preventDefault();

    const networkLink = link;

    openShareWindow(networkLink);
  };
  return (
    <button
      onClick={onClick}
      title={`Compartilhar no ${network}`}
      class="my-0 mx-1 p-1"
      aria-label={`Compartilhar no ${network}`}
    >
      <Icon id={`ShareProduct${network}`} size={16} />
    </button>
  );
}

export default ShareButton;
