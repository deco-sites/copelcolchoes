import Icon from "$store/components/ui/Icon.tsx";

function windowOpen(url: string, width = 650, height = 450) {
  const left = window.outerWidth / 2 +
    (window.screenX || window.screenLeft || 0) -
    width / 2;
  const top = window.outerHeight / 2 +
    (window.screenY || window.screenTop || 0) -
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

  const shareDialog = window.open(
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
