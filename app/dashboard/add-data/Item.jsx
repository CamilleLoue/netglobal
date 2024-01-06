import React from "react";
import * as PropTypes from "prop-types";

function Item(props) {
    return <p className={'text-white'}>{props.item}</p>;
}

Item.propTypes = {item: PropTypes.string, id: PropTypes.number};

export {Item};