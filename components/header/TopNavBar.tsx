export interface Props {
  /**
   * @description Alerts available in the top nav bar
   */
  alert: Alert;
}

export interface Alert {
  textAlert: string;
  /** @format color */
  textColor: string;
}

function TopNavBar({ alert }: Props) {
  return (
    <div class="py-4 px-[1.875rem] lg:py-2 topnavbar bg-primary">
      <div class="flex items-center justify-center">
        <span
          class="text-sm ml-3 text-center leading-[1.125rem]"
          style={{ color: alert.textColor }}
        >
          {alert.textAlert}
        </span>
      </div>
    </div>
  );
}

export default TopNavBar;