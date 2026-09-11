export function storageFailureMessage(error:unknown,action='save'){
 const name=error instanceof DOMException?error.name:'';
 if(name==='QuotaExceededError'||name==='UnknownError')return `Could not ${action} locally because browser storage is unavailable or full. Export a local backup, free browser storage, and try again.`;
 if(name==='InvalidStateError'||name==='NotFoundError')return `Could not ${action} locally because the browser storage database is unavailable. Reload the app and restore a local backup if needed.`;
 return `Could not ${action} locally: ${error instanceof Error?error.message:String(error)}`;
}
