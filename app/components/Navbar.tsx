import React from "react";
import { useScrollPast } from "../hooks/useScrollPast";
import { PRICE } from "../config";
import { Icon } from "./Icon";

interface NavbarProps {
  onJoinClick: () => void;
}

export function Navbar({ onJoinClick }: NavbarProps) {
  const scrolled = useScrollPast(40);

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
      <div className="navbar-inner">
        <div className="brand-row">
          <img src="/1024.png" alt="Taadigi logo" className="brand-logo" />
          <div className="brand-name">
            taa<span>digi</span>
          </div>
        </div>
        <div className="nav-links">
          <a href="#included">What&apos;s Inside</a>
          <a href="#buy">Pricing</a>
          <button type="button" onClick={onJoinClick} className="btn btn-primary nav-cta">
            <Icon name="cart" size={16} />
            Buy Now — {PRICE.currency} {PRICE.current}
          </button>
        </div>
      </div>
    </nav>
  );
}