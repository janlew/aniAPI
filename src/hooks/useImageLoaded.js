import { useState, useEffect, useRef } from "react";

export default function useImageLoaded() {
	const [loaded, setLoaded] = useState(false);
	const ref = useRef();

	const onLoad = () => {
		setLoaded(true);
	};

	useEffect(() => {
		if (ref.current && ref.current.complete) {
			onLoad();
		}
	});

	return [ref, loaded, onLoad];
}
