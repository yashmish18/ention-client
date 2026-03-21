import React from 'react';

interface CheckIconProps {
    className?: string;
}

const CheckIcon: React.FC<CheckIconProps> = ({ className }) => {
    return (
        <div className="w-6 h-6">
            <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                className={className}
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle cx="10.8499" cy="10.8499" r="10.8499" fill="#F3F3F3" />
                <path
                    d="M7.2334 11.4929L9.55206 13.7432L14.4666 8.67993"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
            </svg>
        </div>
    );
};

export default CheckIcon;
