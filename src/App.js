import { useState } from "react";
import "./App.css";
import RecentPassword from "./components/RecentPassword";

function App() {
  const [passwordLength, setPasswordLength] = useState(10);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordCopied, setPasswordCopied] = useState(null);
  const [passwordsList, setPasswordsList] = useState([]);

  const onPassWordLengthHandler = (e) => {
    setPasswordLength(e.target.value);
  };

  const onPasswordGenerator = () => {
    let charSet = "";
    let result = "";

    if (uppercase) charSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase) charSet += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) charSet += "1234567890";
    if (symbols) charSet += "!@#$%^&*";

    for (let i = 0; i < passwordLength; i++) {
      result += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }

    setPassword(result);
    setPasswordsList(
      [...passwordsList, password].filter((pass) => {
        return pass !== "";
      })
    );
  };

  const onCopyPassword = () => {
    navigator.clipboard.writeText(password);
    setPasswordCopied(true);
    setTimeout(() => {
      setPasswordCopied(false);
    }, 2000);
  };

  return (
    <div className="container">
      <h1>Secure Pass</h1>

      <div className="password__block">
        <p className="generated__password">{password}</p>
        <button
          className={passwordCopied ? "copy__btn copied" : "copy__btn"}
          onClick={onCopyPassword}
        >
          <span>Copy Password</span>
          <span className="popover">Copied</span>
        </button>
      </div>

      <div className="password_slider_block">
        <p>Set Password Length : {passwordLength}</p>
        <input
          type="range"
          className="password_length_selector"
          min={8}
          max={16}
          onChange={onPassWordLengthHandler}
          value={passwordLength}
        />
      </div>

      <div className="input__checkbox__container">
        <div className="input__selector_field">
          <input
            name="uppercase"
            type="checkbox"
            onChange={() => setUppercase(!uppercase)}
            checked={uppercase ? true : false}
          />
          <label>Uppercase Letters</label>
        </div>

        <div className="input__selector_field">
          <input
            name="lowercase"
            type="checkbox"
            onChange={() => setLowercase(!lowercase)}
            checked={lowercase ? true : false}
          />
          <label>Lowercase Letters</label>
        </div>
        <div className="input__selector_field">
          <input
            name="numbers"
            type="checkbox"
            onChange={() => setNumbers(!numbers)}
            checked={numbers ? true : false}
          />
          <label>Numbers</label>
        </div>
        <div className="input__selector_field">
          <input
            name="symbols"
            type="checkbox"
            onChange={() => setSymbols(!symbols)}
            checked={symbols ? true : false}
          />
          <label>Symbols</label>
        </div>
      </div>
      <div className="generate__btn__block">
        <button
          className="generate__passowrd__btn"
          onClick={onPasswordGenerator}
        >
          Generate Password
        </button>
      </div>
      <div className="recent_passwords_generated">
        <h4>Recent Generated Passwords</h4>
        <ul className="generated__passwords_list">
          <RecentPassword
            setPasswordsList={setPasswordsList}
            passwordsList={passwordsList}
          />
        </ul>
      </div>
    </div>
  );
}

export default App;
