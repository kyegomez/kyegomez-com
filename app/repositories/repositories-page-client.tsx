'use client';

import { useState, useEffect, useMemo } from 'react';

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
}

export default function RepositoriesPageClient() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [languageFilter, setLanguageFilter] = useState('');
  const [sortBy, setSortBy] = useState<'updated' | 'stars' | 'name'>('updated');
  const [currentPage, setCurrentPage] = useState(1);
  const reposPerPage = 20;

  useEffect(() => {
    async function fetchRepos() {
      try {
        setLoading(true);
        let allRepos: Repo[] = [];
        let page = 1;

        while (page <= 4) {
          const response = await fetch(
            `https://api.github.com/users/kyegomez/repos?sort=updated&per_page=100&page=${page}`
          );

          if (!response.ok) {
            throw new Error(`Failed to fetch repositories: ${response.status}`);
          }

          const pageRepos: Repo[] = await response.json();
          allRepos = [...allRepos, ...pageRepos];

          if (pageRepos.length < 100) {
            break;
          }

          page += 1;
        }

        setRepos(allRepos);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch repositories');
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, []);

  const languages = useMemo(() => {
    const languageSet = new Set(repos.map((repo) => repo.language).filter(Boolean));
    return Array.from(languageSet).sort();
  }, [repos]);

  const filteredAndSortedRepos = useMemo(() => {
    const filtered = repos.filter((repo) => {
      const matchesSearch =
        repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesLanguage = !languageFilter || repo.language === languageFilter;

      return matchesSearch && matchesLanguage;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'stars':
          return b.stargazers_count - a.stargazers_count;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'updated':
        default:
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      }
    });

    return filtered;
  }, [repos, searchTerm, languageFilter, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedRepos.length / reposPerPage);
  const startIndex = (currentPage - 1) * reposPerPage;
  const paginatedRepos = filteredAndSortedRepos.slice(startIndex, startIndex + reposPerPage);

  return (
    <div className="page-wrap">
      <section className="page-block">
        <span className="section-kicker">Open Source</span>
        <h1 className="page-title">Repository index</h1>
        <p className="page-subtitle">
          A filterable list of public repositories, focused on agent systems and AI infrastructure.
        </p>
      </section>

      <section className="page-block" style={{ marginTop: '0.9rem' }}>
        <div className="repo-toolbar">
          <div className="repo-toolbar-row">
            <input
              type="text"
              placeholder="Search repositories"
              value={searchTerm}
              onChange={(event) => {
                setCurrentPage(1);
                setSearchTerm(event.target.value);
              }}
              className="input"
            />
          </div>

          <div className="repo-toolbar-row">
            <select
              value={languageFilter}
              onChange={(event) => {
                setCurrentPage(1);
                setLanguageFilter(event.target.value);
              }}
              className="select"
            >
              <option value="">All languages</option>
              {languages.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(event) => {
                setCurrentPage(1);
                setSortBy(event.target.value as 'updated' | 'stars' | 'name');
              }}
              className="select"
            >
              <option value="updated">Sort: Updated</option>
              <option value="stars">Sort: Stars</option>
              <option value="name">Sort: Name</option>
            </select>
          </div>
        </div>

        <div className="meta-row" style={{ marginTop: '0.95rem' }}>
          <span className="pill">{loading ? 'Loading repositories...' : `${filteredAndSortedRepos.length} repositories`}</span>
          {searchTerm && <span className="pill">Query: {searchTerm}</span>}
          {languageFilter && <span className="pill">Language: {languageFilter}</span>}
          {error && <span className="pill">Error: {error}</span>}
        </div>

        {!loading && !error && (
          <div className="repo-grid">
            {paginatedRepos.map((repo) => (
              <article key={repo.id} className="card">
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <h2 className="repo-name">{repo.name}</h2>
                </a>
                <p className="repo-description">{repo.description || 'No description provided.'}</p>
                <div className="repo-stats">
                  <span>Stars {repo.stargazers_count}</span>
                  <span>Forks {repo.forks_count}</span>
                  {repo.language && <span>{repo.language}</span>}
                  <span>Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
                </div>
                <div className="meta-row">
                  <a className="button subtle" href={repo.html_url} target="_blank" rel="noopener noreferrer">
                    Open on GitHub
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}

        {!loading && !error && totalPages > 1 && (
          <div className="repo-pagination">
            <button
              className="button subtle"
              onClick={() => setCurrentPage((previous) => Math.max(1, previous - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="page-indicator">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="button subtle"
              onClick={() => setCurrentPage((previous) => Math.min(totalPages, previous + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
