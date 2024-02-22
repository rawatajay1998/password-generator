import React, { useState } from "react";

const RecentPassword = ({ passwordsList, setPasswordsList }) => {
  const [recentpasswordCopied, setRecentPasswordCopied] = useState(null);

  // on deleting passwrod from generated list
  const onDeletePassword = (value) => {
    const newPasswordsList = passwordsList.filter((pass) => {
      return pass !== value;
    });
    setPasswordsList(newPasswordsList);
  };

  // On copying recent generated password
  const onCopyingRecentPassword = (value) => {
    setRecentPasswordCopied(value);
    navigator.clipboard.writeText(value);
    setTimeout(() => {
      setRecentPasswordCopied(null);
    }, 2000);
  };

  return (
    <>
      {passwordsList.length > 0
        ? passwordsList.map((pass) => {
            return (
              <li key={pass}>
                <button
                  className="delete__btn"
                  onClick={() => onDeletePassword(pass)}
                >
                  <img
                    src={window.location.origin + "/delete.png"}
                    height={20}
                    width={20}
                    alt="copy password"
                  />
                </button>
                <span className="pass">{pass}</span>
                <button
                  value={pass}
                  className={
                    recentpasswordCopied === pass
                      ? "copy__btn copied"
                      : "copy__btn"
                  }
                  onClick={() => onCopyingRecentPassword(pass)}
                >
                  <img
                    src={window.location.origin + "/copying.png"}
                    height={20}
                    width={20}
                    alt="copy password"
                  />
                  <span className="popover">Copied</span>
                </button>
              </li>
            );
          })
        : "Please generate password"}
    </>
  );
};

export default RecentPassword;
