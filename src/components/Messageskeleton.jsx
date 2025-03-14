import React from "react";

function Messageskeleton() {
  return (
    <>
      <div className="bg-white flex space-x-12 p-12 justify-center items-center">
        <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-blue-400 h-12 w-12" />
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-blue-400 rounded w-3/4" />
              <div className="space-y-2">
                <div className="h-4 bg-blue-400 rounded" />
                <div className="h-4 bg-blue-400 rounded w-5/6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Messageskeleton;
