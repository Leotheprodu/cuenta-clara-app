import React from "react";

export const RechargeTypeItem = ({
  balanceType,
}: {
  balanceType: BalanceTypes;
}) => {
  return (
    <div className="bg-blanco rounded-xl shadow-xl w-40">
      <div>
        <div>{balanceType.name}</div>
        <div>{balanceType.price}</div>
      </div>
      <div>
        <div>{balanceType.balance}</div>
        <div>{balanceType.extra}</div>
      </div>
    </div>
  );
};
