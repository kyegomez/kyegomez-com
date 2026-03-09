'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push('/');
  };

  return (
    <div className="page-action-wrap">
      {pathname !== '/' && (
        <button type="button" className="page-action-btn" onClick={handleBack} aria-label="Go back">
          <span aria-hidden="true">&larr;</span>
          <span>Go back</span>
        </button>
      )}
      {pathname !== '/' && (
        <Link href="/" className="page-action-btn" aria-label="Go home">
          <span aria-hidden="true">&#8962;</span>
          <span>Home</span>
        </Link>
      )}
    </div>
  );
}
